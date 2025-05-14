const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

require('./openapi-validator')(app);

admin.initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
const db = admin.firestore();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Score recorder API listening on port ${PORT}`);
});

module.exports = {
  db
};

// // Routes
// app.post('/players', async (req, res, next) => {
//   try {
//     const { name } = req.body;
//     if (!name) return res.status(400).send('Missing player name');
//     const playerRef = await db.collection('players').add({ name });
//     console.log('Created player:', playerRef.id);
//     res.status(201).send({ id: playerRef.id, name });
//   } catch (error) {
//     next(error);
//   }
// });

// app.get('/players', async (req, res) => {
//   const snapshot = await db.collection('players').get();
//   const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   console.log('Fetched players');
//   res.send(players);
// });

// app.post('/matches', async (req, res) => {
//   const { player1, player2, winner, score, date } = req.body;
//   if (!player1 || !player2 || !winner || !score) {
//     return res.status(400).send('Missing match details');
//   }

//   const match = { player1, player2, winner, score, date: date || new Date().toISOString() };
//   const ref = await db.collection('matches').add(match);
//   console.log('Created match:', ref.id);
//   res.status(201).send({ id: ref.id, ...match });
// });

// app.get('/matches', async (req, res) => {
//   const snapshot = await db.collection('matches').orderBy('date', 'desc').get();
//   const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   console.log('Fetched matches');
//   res.send(matches);
// });

// app.get('/head2head', async (req, res) => {
//   const { player1, player2 } = req.query;

//   const matchesSnapshot = await db.collection('matches')
//     .where('player1', 'in', [player1, player2])
//     .get();

//   let total = 0, p1Wins = 0, p2Wins = 0;
//   matchesSnapshot.forEach(doc => {
//     const match = doc.data();
//     if (
//       (match.player1 === player1 && match.player2 === player2) ||
//       (match.player1 === player2 && match.player2 === player1)
//     ) {
//       total++;
//       if (match.winner === player1) p1Wins++;
//       if (match.winner === player2) p2Wins++;
//     }
//   });
//   console.log(`Head-to-head between ${player1} and ${player2}: ${total} matches`);

//   res.send({
//     player1,
//     player2,
//     totalMatches: total,
//     player1Wins: p1Wins,
//     player2Wins: p2Wins,
//   });
// });