import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { url, file } = req.query;

  if (!url || !file) return res.status(400).json({ error: 'Missing parameters' });

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    
    const json = await response.text();
    const filePath = path.join(process.cwd(), 'public/json', file);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, json, 'utf8');

    res.status(200).json({ message: 'File cached' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
