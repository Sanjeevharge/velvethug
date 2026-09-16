const res = await fetch('http://localhost:8080/api/system/schema-overview').then(r => r.json());
console.log('Schema overview:', JSON.stringify(res, null, 2));

const pageRes = await fetch('http://localhost:8080/backend-inspector');
console.log('Backend inspector status:', pageRes.status, 'Content-Type:', pageRes.headers.get('content-type'));
