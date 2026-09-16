import { PGlite } from '@electric-sql/pglite';

async function test() {
  const db = new PGlite();
  await db.exec(`
    CREATE SCHEMA company;
    CREATE SCHEMA users;
    CREATE TABLE company.staff (id SERIAL PRIMARY KEY, name TEXT);
    CREATE TABLE users.customers (id SERIAL PRIMARY KEY, email TEXT UNIQUE);
    
    INSERT INTO company.staff (name) VALUES ('Subashini Admin');
    INSERT INTO users.customers (email) VALUES ('customer@test.com');
  `);

  const staff = await db.query('SELECT * FROM company.staff');
  const customers = await db.query('SELECT * FROM users.customers');

  console.log('COMPANY SCHEMA DATA:', staff.rows);
  console.log('USERS SCHEMA DATA:', customers.rows);
  console.log('POSTGRES ACID ENGINE OPERATING NORMALLY!');
}

test().catch(console.error);
