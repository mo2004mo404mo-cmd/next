// check admin user
const db = new Bun.SQL('postgres://postgres@127.0.0.1:5432/nextapp');
const r = await db`SELECT name, email, role FROM "User" WHERE email = 'admin@medq.com'`;
console.log(JSON.stringify(r, null, 2));
await db.close();
