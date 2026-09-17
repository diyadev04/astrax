import express from 'express';
import db from '../db/setup';
import { sendGrievanceEmail } from '../services/email';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ASTRAX CORE IS ONLINE' });
});

router.post('/grievance', (req, res) => {
  const { name, age, location, email, phone, grievance } = req.body;
  
  if (!name || !email || !grievance) {
    return res.status(400).json({ error: 'Name, email, and grievance are required.' });
  }

  const stmt = db.prepare(`
    INSERT INTO grievances (name, age, location, email, phone, grievance)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  stmt.run([name, age || null, location || null, email, phone || null, grievance], async function(err) {
    if (err) {
      console.error('DB Error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Attempt to send email but don't fail the request if it fails
    await sendGrievanceEmail(req.body);
    
    res.status(201).json({ success: true, id: this.lastID, message: 'Signal transmitted.' });
  });
});

router.get('/leaderboard', (req, res) => {
  db.all(`SELECT id, player_name, score, signals, max_combo, created_at FROM leaderboard ORDER BY score DESC LIMIT 10`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

router.post('/leaderboard', (req, res) => {
  const { player_name, score, signals, max_combo } = req.body;

  if (!player_name || score === undefined) {
    return res.status(400).json({ error: 'Player name and score are required.' });
  }

  const stmt = db.prepare(`
    INSERT INTO leaderboard (player_name, score, signals, max_combo)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run([player_name, score, signals || 0, max_combo || 1], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ success: true, id: this.lastID });
  });
});

export default router;
