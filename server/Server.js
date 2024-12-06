const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

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

  const query = 'SELECT * FROM spaces INNER JOIN maps ON spaces.map_id = maps.map_id WHERE spaces.owner_id = ?';

  con.query(query, [userID], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(results);
  });
});

app.post('/api/check-arts-from-user', (req, res) => {
  const userID = req.body.userid;

  const query = 'SELECT artworks.art_id, title, art, artworks.created_at,owner_id,username FROM artworks INNER JOIN user_artworks ON artworks.art_id = user_artworks.art_id INNER JOIN users ON user_artworks.owner_id = user_id  WHERE user_artworks.owner_id = ?';

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

app.post('/api/update-space-title', (req, res) => {
  const {title, spaceID} = req.body;
  
  if (!title || !spaceID) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'UPDATE spaces SET title = ? WHERE space_id = ?';
  
  con.query(query, [title, spaceID], (err, results) => {
    if (err) {
      console.error('Error updating spaces title:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Space not found in spaces' });
    }

    res.json({ message: 'Space title updated successfully' });
  });
});

app.post('/api/update-space-status', (req, res) => {
  const {status, spaceID} = req.body;
  
  if (!status || !spaceID) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'UPDATE spaces SET status = ? WHERE space_id = ?';
  
  con.query(query, [status, spaceID], (err, results) => {
    if (err) {
      console.error('Error updating spaces title:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Space not found in spaces' });
    }

    res.json({ message: 'Space title updated successfully' });
  });
});

app.post('/api/update-space-tags', (req, res) => {
  const {tag, spaceID} = req.body;
  
  if (!tag || !spaceID) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'UPDATE spaces SET tag = ? WHERE space_id = ?';
  
  con.query(query, [tag, spaceID], (err, results) => {
    if (err) {
      console.error('Error updating space tag:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Space not found in space' });
    }

    res.json({ message: 'Space tag updated successfully' });
  });
});

app.post('/api/delete-arts', (req, res) => {
  const artId = req.body.id;

  if (!artId) {
    return res.status(400).json({ message: 'Art ID is required' });
  }

  con.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Server error' });
    }
  
    const query1 = 'DELETE FROM user_artworks WHERE art_id = ?';
    con.query(query1, [artId], (err, results) => {
      if (err) {
        return con.rollback(() => {
          console.error('Error deleting from user_artworks:', err);
          return res.status(500).json({ message: 'Server error' });
        });
      }

      if (results.affectedRows === 0) {
        return con.rollback(() => {
          return res.status(404).json({ message: 'Art not found in user_artworks' });
        });
      }

      const query2 = 'DELETE FROM artworks WHERE art_id = ?';
      con.query(query2, [artId], (err, results) => {
        if (err) {
          return con.rollback(() => {
            console.error('Error deleting from artworks:', err);
            return res.status(500).json({ message: 'Server error' });
          });
        }

        if (results.affectedRows === 0) {
          return con.rollback(() => {
            return res.status(404).json({ message: 'Art not found in artworks' });
          });
        }

        // Commit the transaction if both deletions are successful
        con.commit((err) => {
          if (err) {
            return con.rollback(() => {
              console.error('Error committing transaction:', err);
              return res.status(500).json({ message: 'Server error' });
            });
          }

          // Respond with success if both queries were successful
          res.json({ message: 'Art deleted successfully' });
        });
      });
    });
  });
});

app.post('/api/update-art-title', (req, res) => {
  const {title, artId} = req.body;
  
  if (!title || !artId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'UPDATE artworks SET title = ? WHERE art_id = ?';
  
  con.query(query, [title, artId], (err, results) => {
    if (err) {
      console.error('Error updating artworks title:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Art not found in artworks' });
    }

    res.json({ message: 'Art title updated successfully' });
  });
});

app.post('/api/save-image', (req, res) => {
  const { title, art, owner_id } = req.body;

  if (!title || !art || !owner_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  con.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    const query1 = 'INSERT INTO artworks (title, art) VALUES (?, ?)';
    con.query(query1, [title, art], (err, results) => {
      if (err) {
        return con.rollback(() => {
          console.error('Error inserting into artworks:', err);
          return res.status(500).json({ message: 'Server error' });
        });
      }

      // Extract the art_id from the results of the first query
      const artId = results.insertId;

      // Insert into user_artworks table
      const query2 = 'INSERT INTO user_artworks (art_id, owner_id) VALUES (?, ?)';
      con.query(query2, [artId, owner_id], (err, results) => {
        if (err) {
          return con.rollback(() => {
            console.error('Error inserting into user_artworks:', err);
            return res.status(500).json({ message: 'Server error' });
          });
        }

        // Commit transaction after both queries are successful
        con.commit((err) => {
          if (err) {
            return con.rollback(() => {
              console.error('Error committing transaction:', err);
              return res.status(500).json({ message: 'Server error' });
            });
          }

          // Respond with success if both queries were successful
          res.json({ message: 'Art saved successfully' });
        });
      });
    });
  });
});

app.get('/api/img', (req, res) => { 
  con.query('SELECT artworks.art_id, title, art, artworks.created_at,owner_id,username FROM artworks INNER JOIN user_artworks INNER JOIN users WHERE artworks.art_id = user_artworks.art_id AND user_artworks.owner_id = user_id', (err, results) => { 
    if (err) { return res.status(500).json({ error: err.message }); 
  }
    res.json(results);
});
});

app.post('/api/check-arts-from-artid', (req, res) => {
  const artID = req.body.artID;

  const query = 'SELECT artworks.art_id, title, art, artworks.created_at,owner_id,username FROM artworks INNER JOIN user_artworks ON artworks.art_id = user_artworks.art_id INNER JOIN users ON user_artworks.owner_id = user_id  WHERE artworks.art_id = ?';

  con.query(query, [artID], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(results);
  });
});

app.post('/api/check-comments-from-artid', (req, res) => {
  const artID = req.body.artID;

  const query = 'SELECT comments.id, comments.art_id, comments.user_id, comment, comments.created_at, username FROM comments INNER JOIN user_artworks ON comments.art_id = user_artworks.art_id INNER JOIN users ON comments.user_id = users.user_id  WHERE comments.art_id = ?';

  con.query(query, [artID], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(results);
  });
});

app.post('/api/add-comment', (req, res) => {
  const {artID, userID, comment} = req.body;
  
  if (!artID || !userID || !comment) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'INSERT INTO comments (art_id, user_id, comment) VALUES (?, ?, ?)';
  
  con.query(query, [artID, userID, comment], (err, results) => {
    if (err) {
      console.error('Error updating comment:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json({ message: 'Comment updated successfully' });
  });
});

app.post('/api/edit-comment', (req, res) => {
  const {ID, comment} = req.body;
  
  if (!ID || !comment) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'UPDATE comments SET comment = ? WHERE id = ?';
  
  con.query(query, [comment,ID], (err, results) => {
    if (err) {
      console.error('Error updating comment:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment updated successfully' });
  });
});

app.post('/api/delete-comment', (req, res) => {
  const ID = req.body.ID;

  if (!ID) {
    return res.status(400).json({ message: 'ID is required' });
  }

  const query = 'DELETE FROM comments WHERE id = ?';

  con.query(query, [ID], (err, results) => {
    if (err) {
      console.error('Error deleting comment:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Space deleted successfully' });
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});