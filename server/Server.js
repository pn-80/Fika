const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fika"
});

app.get('/api/users', (req, res) => {
  con.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.json(err);
    }
    res.json(results);
  });
});

app.post('/api/check-username', (req, res) => {
  const inputusername = req.body.username;

  const query = 'SELECT * FROM users WHERE username = ?';

  con.query(query, [inputusername], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Invalid Username' });
    }

    res.json(results);
  });
});

app.post('/api/check-spaces-from-user', (req, res) => {
  const userID = req.body.userid;

  const query = 'SELECT * FROM spaces INNER JOIN maps WHERE spaces.owner_id = ? AND spaces.map_id = maps.map_id';

  con.query(query, [userID], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(results);
  });
});

app.post('/api/delete-spaces', (req, res) => {
  const spaceId = req.body.id;

  if (!spaceId) {
    return res.status(400).json({ message: 'Space ID is required' });
  }

  const query = 'DELETE FROM spaces WHERE space_id = ?';

  con.query(query, [spaceId], (err, results) => {
    if (err) {
      console.error('Error deleting space:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Space not found' });
    }

    res.json({ message: 'Space deleted successfully' });
  });
});

app.get('/api/img', (req, res) => { 
  con.query('SELECT * FROM artworks INNER JOIN user_artworks INNER JOIN users WHERE artworks.art_id = user_artworks.art_id AND user_artworks.owner_id = user_id', (err, results) => { 
    if (err) { return res.status(500).json({ error: err.message }); 
  }
    res.json(results);
    console.log(results);
});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});