import { PRODUCTS, CATEGORIES, DOCTORS, ACTIVE_PROMOS, SLEEP_QUIZ } from '../src/data/products.js';
import { DEFAULT_ADMIN_USERS, DEFAULT_RETURNS } from '../src/data/adminStore.js';

console.log('Products:', PRODUCTS?.length);
console.log('Categories:', Object.keys(CATEGORIES || {}));
console.log('Doctors:', DOCTORS?.length);
console.log('Promos:', ACTIVE_PROMOS?.length);
console.log('Quiz questions:', SLEEP_QUIZ?.length);
console.log('Admin users:', DEFAULT_ADMIN_USERS?.length);
console.log('Default returns:', DEFAULT_RETURNS?.length);
