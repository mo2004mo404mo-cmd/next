import { SQL } from 'bun';
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const cols = await db`SELECT column_name FROM information_schema.columns WHERE table_name='Question' AND (column_name ILIKE '%review%' OR column_name ILIKE '%public%' OR column_name ILIKE '%author%' OR column_name ILIKE '%status%' OR column_name ILIKE '%image%')`;
console.log('cols:', cols.map(c=>c.column_name).join(', '));
db.close();
