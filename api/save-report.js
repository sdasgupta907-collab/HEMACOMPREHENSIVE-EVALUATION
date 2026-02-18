import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  try {
    const data = req.body;
    const result = await sql`
      INSERT INTO reports (data, student_name, class, roll)
      VALUES (${JSON.stringify(data)}, ${data.student?.studentName || ''}, ${data.student?.classSection || ''}, ${data.student?.rollNo || ''})
      RETURNING id
    `;
    res.json({ success: true, id: result.rows[0].id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
