-- ==============================================================================
-- VELVET HUG — ENTERPRISE POSTGRESQL RELATIONAL SCHEMA
-- Dual-Partition Architecture:
-- 1. "company" Schema: Catalog, Inventory, Staff RBAC, Audit Logs, Quiz Rules
-- 2. "users" Schema: Customers, Sessions, Orders, Line Items, RMAs, Referrals
-- ==============================================================================

-- Enable schemas
CREATE SCHEMA IF NOT EXISTS company;
CREATE SCHEMA IF NOT EXISTS users;

-- ══════════════════════════════════════════════════════════════════════════════
-- SCHEMA 1: COMPANY & OPERATIONS DATA
-- ══════════════════════════════════════════════════════════════════════════════

-- 1. Staff RBAC Users
CREATE TABLE IF NOT EXISTS company.staff_users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(64) NOT NULL DEFAULT 'super_admin',
    role_label VARCHAR(128) NOT NULL DEFAULT 'Sole Administrator',
    password_hash VARCHAR(255) NOT NULL,
    two_factor_secret VARCHAR(32) NOT NULL DEFAULT '8942',
    avatar VARCHAR(10) DEFAULT 'S',
    department VARCHAR(255) DEFAULT 'Sole Administrator & Founder Operations',
    phone VARCHAR(32) DEFAULT '+91 98800 11223',
    last_login TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Category Master
CREATE TABLE IF NOT EXISTS company.categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Product Master Catalog (Anatomy, Specs & Metafield mappings)
CREATE TABLE IF NOT EXISTS company.products (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id VARCHAR(64) NOT NULL REFERENCES company.categories(id) ON DELETE RESTRICT,
    tagline TEXT,
    description TEXT,
    base_price NUMERIC(12, 2) NOT NULL CHECK (base_price > 0),
    mrp NUMERIC(12, 2) NOT NULL CHECK (mrp >= base_price),
    rating NUMERIC(3, 2) DEFAULT 4.90 CHECK (rating >= 0 AND rating <= 5.0),
    review_count INT DEFAULT 120 CHECK (review_count >= 0),
    image_url TEXT,
    badges_json JSONB DEFAULT '[]'::jsonb,
    features_json JSONB DEFAULT '[]'::jsonb,
    specs_json JSONB DEFAULT '{}'::jsonb,
    sizes_json JSONB DEFAULT '[]'::jsonb,
    model_3d_glb TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Inventory Batches & Stock per Variant
CREATE TABLE IF NOT EXISTS company.inventory (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL REFERENCES company.products(id) ON DELETE CASCADE,
    size VARCHAR(64) NOT NULL,
    sku VARCHAR(128) UNIQUE NOT NULL,
    stock_available INT NOT NULL DEFAULT 50 CHECK (stock_available >= 0),
    stock_reserved INT NOT NULL DEFAULT 0 CHECK (stock_reserved >= 0),
    reorder_level INT NOT NULL DEFAULT 10,
    warehouse_loc VARCHAR(128) DEFAULT 'BLR-HUB-01',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Promotions, Vouchers & Pricing Rules
CREATE TABLE IF NOT EXISTS company.pricing_promos (
    id SERIAL PRIMARY KEY,
    code VARCHAR(64) UNIQUE NOT NULL,
    description TEXT,
    discount_percent NUMERIC(5, 2) DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
    discount_amount NUMERIC(12, 2) DEFAULT 0 CHECK (discount_amount >= 0),
    min_order_value NUMERIC(12, 2) DEFAULT 0,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE,
    usage_limit INT DEFAULT 1000,
    times_used INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Sleep Quiz Diagnostic Question Matrix
CREATE TABLE IF NOT EXISTS company.quiz_questions (
    id VARCHAR(32) PRIMARY KEY,
    step_index INT NOT NULL,
    question TEXT NOT NULL,
    options_json JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 7. Consulting Orthopedic Doctors
CREATE TABLE IF NOT EXISTS company.doctors (
    id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    speciality VARCHAR(255) NOT NULL,
    hospital VARCHAR(255) NOT NULL,
    clinical_reason TEXT NOT NULL,
    whatsapp_number VARCHAR(32) NOT NULL,
    avatar TEXT
);

-- 8. Immutable Administrative & DPDP Compliance Audit Logs
CREATE TABLE IF NOT EXISTS company.audit_logs (
    id SERIAL PRIMARY KEY,
    staff_id VARCHAR(64),
    staff_name VARCHAR(255),
    action VARCHAR(128) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(128),
    details_json JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(64) DEFAULT '127.0.0.1',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. System & Shopify Integration Settings
CREATE TABLE IF NOT EXISTS company.settings (
    key VARCHAR(128) PRIMARY KEY,
    value_json JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- ══════════════════════════════════════════════════════════════════════════════
-- SCHEMA 2: USERS & CUSTOMER DATA
-- ══════════════════════════════════════════════════════════════════════════════

-- 1. Registered Customers
CREATE TABLE IF NOT EXISTS users.customers (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(32) UNIQUE,
    password_hash VARCHAR(255),
    avatar VARCHAR(10) DEFAULT 'C',
    founding_number INT UNIQUE,
    is_founding BOOLEAN DEFAULT FALSE,
    is_ambassador BOOLEAN DEFAULT FALSE,
    referral_code VARCHAR(64) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Customer Sessions (Token-based, No localStorage)
CREATE TABLE IF NOT EXISTS users.sessions (
    token VARCHAR(128) PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL REFERENCES users.customers(id) ON DELETE CASCADE,
    ip_address VARCHAR(64),
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Saved Addresses
CREATE TABLE IF NOT EXISTS users.addresses (
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL REFERENCES users.customers(id) ON DELETE CASCADE,
    label VARCHAR(64) DEFAULT 'Home',
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(128) NOT NULL,
    state VARCHAR(128) NOT NULL,
    pincode VARCHAR(16) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Master Orders Table (ACID Protected)
CREATE TABLE IF NOT EXISTS users.orders (
    id VARCHAR(64) PRIMARY KEY,
    customer_id VARCHAR(64) REFERENCES users.customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(32),
    delivery_address TEXT NOT NULL,
    order_status VARCHAR(64) NOT NULL DEFAULT 'confirmed'
        CHECK (order_status IN ('pending', 'confirmed', 'manufacturing', 'dispatched', 'out_for_delivery', 'delivered', 'cancelled', 'returned')),
    payment_status VARCHAR(64) NOT NULL DEFAULT 'paid'
        CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_method VARCHAR(64) NOT NULL DEFAULT 'upi',
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal >= 0),
    discount_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    shipping_amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount >= 0),
    coupon_used VARCHAR(64),
    tracking_number VARCHAR(128),
    notes TEXT,
    shopify_order_id VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Order Line Items
CREATE TABLE IF NOT EXISTS users.order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(64) NOT NULL REFERENCES users.orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES company.products(id) ON DELETE RESTRICT,
    product_name VARCHAR(255) NOT NULL,
    size VARCHAR(64) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price > 0),
    subtotal NUMERIC(12, 2) NOT NULL CHECK (subtotal > 0)
);

-- 6. Persistent Shopping Cart
CREATE TABLE IF NOT EXISTS users.cart_items (
    id SERIAL PRIMARY KEY,
    session_or_customer_id VARCHAR(128) NOT NULL,
    product_id VARCHAR(64) NOT NULL REFERENCES company.products(id) ON DELETE CASCADE,
    size VARCHAR(64) NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(session_or_customer_id, product_id, size)
);

-- 7. Persistent Wishlist
CREATE TABLE IF NOT EXISTS users.wishlist_items (
    id SERIAL PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL REFERENCES users.customers(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES company.products(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id, product_id)
);

-- 8. Customer Sleep Quiz Diagnostic Submissions
CREATE TABLE IF NOT EXISTS users.quiz_diagnoses (
    id SERIAL PRIMARY KEY,
    session_or_customer_id VARCHAR(128) NOT NULL,
    answers_json JSONB NOT NULL,
    recommended_product_id VARCHAR(64) REFERENCES company.products(id) ON DELETE SET NULL,
    recommended_firmness VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. 100-Night Free Trial Return & Exchange RMAs
CREATE TABLE IF NOT EXISTS users.returns_rmas (
    id VARCHAR(64) PRIMARY KEY,
    order_id VARCHAR(64),
    customer_id VARCHAR(64) REFERENCES users.customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(32),
    request_type VARCHAR(64) NOT NULL DEFAULT 'Firmness Exchange',
    reason TEXT NOT NULL,
    pickup_address TEXT NOT NULL,
    hygiene_confirmed BOOLEAN DEFAULT TRUE,
    status VARCHAR(128) NOT NULL DEFAULT 'Pending Review',
    specialist_assigned VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Referral Program Ledger
CREATE TABLE IF NOT EXISTS users.referral_stats (
    customer_id VARCHAR(64) PRIMARY KEY REFERENCES users.customers(id) ON DELETE CASCADE,
    referral_count INT DEFAULT 0 CHECK (referral_count >= 0),
    earned_amount NUMERIC(12, 2) DEFAULT 0 CHECK (earned_amount >= 0),
    pending_amount NUMERIC(12, 2) DEFAULT 0 CHECK (pending_amount >= 0),
    is_ambassador BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ══════════════════════════════════════════════════════════════════════════════
-- PERFORMANCE INDICES
-- ══════════════════════════════════════════════════════════════════════════════
CREATE INDEX IF NOT EXISTS idx_products_category ON company.products(category_id);
CREATE INDEX IF NOT EXISTS idx_inventory_product ON company.inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON users.orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON users.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON users.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_cart_session ON users.cart_items(session_or_customer_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON company.audit_logs(created_at DESC);
