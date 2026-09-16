// server/database/db.js — Velvet Hug High-Performance PostgreSQL Database Manager
// Dual-driver: PGlite (Embedded WASM on-disk persistence) OR pg.Pool (Cloud/External Postgres)
// Strict ACID Compliance, Dual Schemas ("company" and "users")

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PGlite } from '@electric-sql/pglite';
import pg from 'pg';
import dotenv from 'dotenv';

import { PRODUCTS, CATEGORIES, DOCTORS, ACTIVE_PROMOS, SLEEP_QUIZ } from '../../src/data/products.js';
import { DEFAULT_ADMIN_USERS } from '../../src/data/adminStore.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data/postgres_store');

let pgliteInstance = null;
let pgPoolInstance = null;
let isInitialized = false;
let initPromise = null;

// Determine driver mode
const isExternalPostgres = Boolean(process.env.DATABASE_URL);

/**
 * Initialize the database connection, execute schema, and seed initial records.
 */
export async function initDb() {
  if (isInitialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    console.log(`[Database] Initializing PostgreSQL engine... Mode: ${isExternalPostgres ? 'pg.Pool (External/Cloud)' : 'PGlite (Local Persistent On-Disk)'}`);

    if (isExternalPostgres) {
      pgPoolInstance = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false }
      });
    } else {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      pgliteInstance = new PGlite(DATA_DIR);
    }

    // 1. Run Schema DDL
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('[Database] Executing Dual-Schema DDL ("company" & "users")...');
    if (isExternalPostgres) {
      await pgPoolInstance.query(schemaSql);
    } else {
      await pgliteInstance.exec(schemaSql);
    }
    console.log('[Database] DDL executed successfully.');

    // Set initialized flag BEFORE seeding so query() doesn't re-trigger initDb()
    isInitialized = true;

    // 2. Check and Seed Initial Data
    await seedInitialData(false);

    console.log('[Database] PostgreSQL Database Ready and 100% ACID Operational.');
  })();

  return initPromise;
}

/**
 * Execute a SQL query with benchmark timing.
 * Supports parameterized queries ($1, $2, etc.)
 */
export async function query(sql, params = []) {
  if (!isInitialized) await initDb();

  const start = performance.now();
  let result;

  try {
    if (isExternalPostgres) {
      result = await pgPoolInstance.query(sql, params);
    } else {
      result = await pgliteInstance.query(sql, params);
    }
    const durationMs = Number((performance.now() - start).toFixed(2));
    return {
      rows: result.rows,
      rowCount: result.rows ? result.rows.length : (result.affectedRows || 0),
      durationMs
    };
  } catch (error) {
    console.error(`[Database Error] SQL: "${sql.slice(0, 100)}..." Params:`, params, error.message);
    throw error;
  }
}

/**
 * Atomic Transaction Runner (ACID Guarantees: Atomicity, Consistency, Isolation, Durability)
 */
export async function transaction(callback) {
  if (!isInitialized) await initDb();

  if (isExternalPostgres) {
    const client = await pgPoolInstance.connect();
    try {
      await client.query('BEGIN');
      const txQuery = async (sql, params = []) => {
        const start = performance.now();
        const res = await client.query(sql, params);
        return { rows: res.rows, rowCount: res.rowCount, durationMs: Number((performance.now() - start).toFixed(2)) };
      };
      const result = await callback(txQuery);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } else {
    return await pgliteInstance.transaction(async (tx) => {
      const txQuery = async (sql, params = []) => {
        const start = performance.now();
        const res = await tx.query(sql, params);
        return { rows: res.rows, rowCount: res.rows.length, durationMs: Number((performance.now() - start).toFixed(2)) };
      };
      return await callback(txQuery);
    });
  }
}

/**
 * Seed master catalog, categories, staff, promotions, doctors, quiz questions.
 * Customer data starts completely clean with 0 records.
 */
export async function seedInitialData(force = false) {
  const check = await query('SELECT COUNT(*) as count FROM company.products');
  const count = parseInt(check.rows[0].count, 10);

  if (count > 0 && !force) {
    console.log(`[Database] Found ${count} existing products in company.products. Skipping seed.`);
    return;
  }

  console.log('[Database] Seeding canonical master data into company partition...');

  // A. Seed Staff Users
  for (const u of DEFAULT_ADMIN_USERS) {
    await query(`
      INSERT INTO company.staff_users (id, name, email, role, role_label, password_hash, two_factor_secret, avatar, department, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO NOTHING
    `, [u.id, u.name, u.email, u.role, u.roleLabel, u.passwordHash, u.twoFactorSecret, u.avatar, u.department, u.phone]);
  }

  // B. Seed Categories
  const categoryEntries = Object.entries(CATEGORIES);
  for (let i = 0; i < categoryEntries.length; i++) {
    const [slug, cat] = categoryEntries[i];
    await query(`
      INSERT INTO company.categories (id, name, slug, display_order)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO NOTHING
    `, [slug, cat.label, slug, i + 1]);
  }

  // C. Seed All 18 Products & All 46 Variant SKUs
  for (const p of PRODUCTS) {
    const specsJson = JSON.stringify({
      collection: p.collection || 'Signature',
      firmness: p.firmness || 'Medium-Firm',
      firmnessScore: p.firmnessScore || 5,
      ageGroup: p.ageGroup || 'All Ages',
      packaging: p.packaging || ['Box-Packed'],
      layers: p.layers || [],
      discount: p.discount || 0,
      emi: p.emi || '',
      badge: p.badge || '',
      badgeLabel: p.badgeLabel || '',
      tags: p.tags || [],
      doctorRecommended: Boolean(p.doctorRecommended),
      height: p.height || 20,
      thicknessInch: p.thicknessInch || 8,
      sleepNeeds: p.sleepNeeds || [],
      trialDays: p.trialDays || 100,
      warranty: p.warranty || '10 years',
      has3D: Boolean(p.has3D),
      materials: p.materials || []
    });

    const badgesJson = JSON.stringify(p.badge ? [{ badge: p.badge, label: p.badgeLabel }] : []);
    const featuresJson = JSON.stringify(p.features || []);
    const sizesJson = JSON.stringify(p.sizes || ['Standard']);

    await query(`
      INSERT INTO company.products (
        id, name, slug, category_id, tagline, description, base_price, mrp, rating, review_count,
        image_url, badges_json, features_json, specs_json, sizes_json, model_3d_glb
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (id) DO UPDATE SET 
        name = EXCLUDED.name,
        base_price = EXCLUDED.base_price,
        mrp = EXCLUDED.mrp,
        image_url = EXCLUDED.image_url,
        specs_json = EXCLUDED.specs_json,
        sizes_json = EXCLUDED.sizes_json
    `, [
      p.id,
      p.name,
      p.id,
      p.category,
      p.tagline || '',
      p.description || '',
      p.basePrice || 10000,
      p.mrp || p.basePrice || 10000,
      p.rating || 4.8,
      p.reviews || 100,
      p.image || '',
      badgesJson,
      featuresJson,
      specsJson,
      sizesJson,
      p.has3D ? `/src/assets/models/${p.id}.glb` : null
    ]);

    // Seed inventory for each size variant
    const sizes = p.sizes && p.sizes.length > 0 ? p.sizes : ['Standard'];
    for (const sz of sizes) {
      const sku = `${p.id}-${sz.toUpperCase().replace(/[^A-Z0-9]/g, '')}`;
      await query(`
        INSERT INTO company.inventory (product_id, size, sku, stock_available, stock_reserved, reorder_level, warehouse_loc)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (sku) DO UPDATE SET stock_available = EXCLUDED.stock_available
      `, [p.id, sz, sku, 50, 0, 10, 'BLR-HUB-01']);
    }
  }

  // D. Seed Pricing Promos
  for (const promo of ACTIVE_PROMOS) {
    const code = promo.coupon || promo.code || 'FOUNDING15';
    const desc = promo.message || promo.desc || promo.description || 'Exclusive Launch Promotion';
    await query(`
      INSERT INTO company.pricing_promos (code, description, discount_percent, discount_amount, min_order_value)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (code) DO NOTHING
    `, [code, desc, 15, 0, 0]);
  }

  // Extra promo codes
  await query(`
    INSERT INTO company.pricing_promos (code, description, discount_percent, discount_amount, min_order_value)
    VALUES ('DIWALI30', 'Festive Celebration 30% Off', 30, 0, 10000),
           ('VELVET10', 'Flat 10% Welcome Discount', 10, 0, 5000),
           ('FOUNDER500', 'Special Founder Privilege Voucher', 0, 500, 2000)
    ON CONFLICT (code) DO NOTHING
  `);

  // E. Seed Quiz Questions
  for (let i = 0; i < SLEEP_QUIZ.length; i++) {
    const q = SLEEP_QUIZ[i];
    await query(`
      INSERT INTO company.quiz_questions (id, step_index, question, options_json)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO NOTHING
    `, [q.id, i + 1, q.question, JSON.stringify(q.options)]);
  }

  // F. Seed Doctors
  for (let i = 0; i < DOCTORS.length; i++) {
    const d = DOCTORS[i];
    const docId = `doc_00${i + 1}`;
    await query(`
      INSERT INTO company.doctors (id, name, speciality, hospital, clinical_reason, whatsapp_number, avatar)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (id) DO NOTHING
    `, [
      docId,
      d.name,
      d.speciality || d.specialty || 'Physiotherapy & Spinal Health',
      d.hospital || 'AIIMS, New Delhi',
      d.says || d.clinical_reason || 'Clinical grade orthopedic spinal support.',
      '+91 98800 11223',
      d.avatar || ''
    ]);
  }

  // G. Seed Settings
  await query(`
    INSERT INTO company.settings (key, value_json)
    VALUES
      ('store_profile', '{"brand":"Velvet Hug","tagline":"The Sacred Architecture of Rest","currency":"INR","supportPhone":"+91 98800 11223"}'::jsonb),
      ('trial_policy', '{"trialDays":100,"freeReturn":true,"zeroHassle":true}'::jsonb),
      ('dpdp_compliance', '{"dpdpConsentVersion":"2026.1","dataRetainDays":365,"encryptionStandard":"AES-256"}'::jsonb),
      ('shopify_sync', '{"shopDomain":"velvethug.myshopify.com","syncActive":false,"autoSyncInventory":true}'::jsonb)
    ON CONFLICT (key) DO NOTHING
  `);

  // H. Seed Audit Log
  await query(`
    INSERT INTO company.audit_logs (staff_id, staff_name, action, entity_type, entity_id, details_json)
    VALUES ('usr_001', 'Subashini', 'SYSTEM_BOOTSTRAP', 'SYSTEM', 'POSTGRESQL_ENGINE', '{"version":"PostgreSQL 16 Enterprise","status":"Canonical company master catalog initialized"}'::jsonb)
  `);

  console.log('[Database] Master catalog initialized. Customer partitions start 100% clean.');
}

/**
 * Clean slate reset of all user/customer/order records for testing
 */
export async function resetUsersData() {
  await transaction(async (tx) => {
    await tx('DELETE FROM users.wishlist_items');
    await tx('DELETE FROM users.cart_items');
    await tx('DELETE FROM users.quiz_diagnoses');
    await tx('DELETE FROM users.returns_rmas');
    await tx('DELETE FROM users.order_items');
    await tx('DELETE FROM users.orders');
    await tx('DELETE FROM users.addresses');
    await tx('DELETE FROM users.sessions');
    await tx('DELETE FROM users.referral_stats');
    await tx('DELETE FROM users.customers');
    await tx(`
      INSERT INTO company.audit_logs (staff_id, staff_name, action, entity_type, entity_id, details_json)
      VALUES ('SYSTEM', 'ADMIN_RESET', 'USERS_DATA_PURGED', 'USERS_SCHEMA', 'ALL_TABLES', '{"status":"Clean slate ready for testing"}'::jsonb)
    `);
  });
  console.log('[Database] Users data cleanly purged.');
  return { success: true, message: 'All customer and order records cleanly wiped for testing.' };
}

/**
 * Factory reset of company catalog and inventory to canonical 18 products and 46 SKUs
 */
export async function resetCompanyData() {
  await transaction(async (tx) => {
    await tx('DELETE FROM company.inventory');
    await tx('DELETE FROM company.products');
    await tx('DELETE FROM company.categories');
    await tx('DELETE FROM company.pricing_promos');
    await tx('DELETE FROM company.quiz_questions');
    await tx('DELETE FROM company.doctors');
    await tx('DELETE FROM company.staff_users');
    await tx('DELETE FROM company.settings');
  });
  await seedInitialData(true);
  console.log('[Database] Company master catalog and inventory restored.');
  return { success: true, message: 'Company master catalog and inventory restored to factory baseline.' };
}

/**
 * Full synchronous system reset
 */
export async function fullReset() {
  await resetUsersData();
  await resetCompanyData();
  return { success: true, message: 'Full system synchronized and reset cleanly.' };
}

/**
 * Returns health metrics, database latency, and storage statistics.
 */
export async function getHealth() {
  const start = performance.now();
  const testRes = await query('SELECT 1 as ping');
  const pingLatencyMs = Number((performance.now() - start).toFixed(2));

  let dataSizeMb = 0;
  if (!isExternalPostgres && fs.existsSync(DATA_DIR)) {
    const getDirSize = (dir) => {
      let size = 0;
      for (const file of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) size += getDirSize(fullPath);
        else size += fs.statSync(fullPath).size;
      }
      return size;
    };
    try {
      dataSizeMb = Number((getDirSize(DATA_DIR) / (1024 * 1024)).toFixed(2));
    } catch (e) {
      dataSizeMb = 0;
    }
  }

  const tableCounts = await query(`
    SELECT
      (SELECT COUNT(*) FROM company.products) as products_count,
      (SELECT COUNT(*) FROM company.inventory) as inventory_count,
      (SELECT COUNT(*) FROM company.staff_users) as staff_count,
      (SELECT COUNT(*) FROM company.pricing_promos) as promos_count,
      (SELECT COUNT(*) FROM company.audit_logs) as audit_logs_count,
      (SELECT COUNT(*) FROM users.customers) as customers_count,
      (SELECT COUNT(*) FROM users.orders) as orders_count,
      (SELECT COUNT(*) FROM users.order_items) as order_items_count,
      (SELECT COUNT(*) FROM users.cart_items) as cart_items_count,
      (SELECT COUNT(*) FROM users.returns_rmas) as returns_count
  `);

  return {
    status: 'healthy',
    engine: isExternalPostgres ? 'PostgreSQL Server (External/Cloud)' : 'PGlite PostgreSQL 16 (On-Disk Persistent WASM Engine)',
    acidCompliance: '100% Strict ACID Guarantees (Atomicity, Consistency, Isolation, Durability)',
    schemas: ['company', 'users'],
    dataDirectory: isExternalPostgres ? 'Remote Host' : DATA_DIR,
    diskUsageMb: dataSizeMb,
    pingLatencyMs,
    tableCounts: tableCounts.rows[0]
  };
}
