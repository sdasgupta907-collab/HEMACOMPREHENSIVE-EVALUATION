import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        student_name TEXT,
        class TEXT,
        roll TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    res.json({ success: true, message: '✅ Table created!' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
