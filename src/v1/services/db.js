const admin = require('firebase-admin');
const env = require('dotenv').config('../.env');

admin.initializeApp({ projectId: env.GOOGLE_CLOUD_PROJECT });
const db = admin.firestore();

// Routes
const writePlayer = async (name) => {
  try {
    const playerRef = await db.collection('players').add({ name });
    console.log('Created player:', playerRef.id);
    responseBody = { id: playerRef.id, name };
    return responseBody;
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

const readPlayers = async () => {
  try {
    const snapshot = await db.collection('players').get();
    const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched players');
    return players;
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

const writeMatch = async (body) => {
  try {
    const { player1, player2, winner, score, date } = body;
    if (!player1 || !player2 || !winner || !score) {
      return res.status(400).send('Missing match details');
    }
    const match = { player1, player2, winner, score, date: date || new Date().toISOString() };
    const ref = await db.collection('matches').add(match);
    console.log('Created match:', ref.id);
    const responseBody = { id: ref.id, ...match };
    return responseBody;
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

const readMatches = async () => {
  try {
    const snapshot = await db.collection('matches').orderBy('date', 'desc').get();
    const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched matches');
    return matches;
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

const readHeadToHead = async (player1, player2) => {
  try {
    const matchesSnapshot = await db.collection('matches')
      .where('player1', 'in', [player1, player2])
      .get();
  
    let total = 0, p1Wins = 0, p2Wins = 0;
    matchesSnapshot.forEach(doc => {
      const match = doc.data();
      if (
        (match.player1 === player1 && match.player2 === player2) ||
        (match.player1 === player2 && match.player2 === player1)
      ) {
        total++;
        if (match.winner === player1) p1Wins++;
        if (match.winner === player2) p2Wins++;
      }
    });
    console.log(`Head-to-head between ${player1} and ${player2}: ${total} matches`);
  
    responseBody = {
      player1,
      player2,
      totalMatches: total,
      player1Wins: p1Wins,
      player2Wins: p2Wins,
    };
    return responseBody;
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

const readPlayer = async (id) => {
  try {
    const playerRef = db.collection('players').doc(id);
    const playerDoc = await playerRef.get();
    const player = { id: playerDoc.id, ...playerDoc.data() };
    console.log('Fetched player:', player);
    return player;
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

const removePlayer = async (id) => {
  try {
    const playerRef = db.collection('players').doc(id);
    await playerRef.delete();
    console.log('Deleted player:', id);
    return { message: 'Player deleted successfully' };
  } catch (error) {
    error.status = 500;
    throw error;
  }
};

module.exports = {
  writePlayer,
  readPlayers,
  writeMatch,
  readMatches,
  readHeadToHead,
  readPlayer,
  removePlayer
};