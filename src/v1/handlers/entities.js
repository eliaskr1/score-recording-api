const { 
  writePlayer,
  readPlayers,
  writeMatch,
  readMatches,
  readHeadToHead,
  readPlayer,
  removePlayer,
  } = require('../services/db.js');

async function postPlayer(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).send('Missing player name');
    responseBody = await writePlayer(name);
    return res.status(201).json(responseBody);
  } catch (error) {
    return next(error);
  }
}

async function getPlayers(req, res, next) {
  try {
    const players = await readPlayers();
    return res.status(200).json(players);
  } catch (error) {
    return next(error);
  }
}

async function postMatch(req, res, next) {
  try {
    responseBody = await writeMatch(req.body);
    return res.status(201).json(responseBody);
  } catch (error) {
    return next(error);
  }
}

async function getMatches(req, res, next) {
  try {
    const matches = await readMatches();
    return res.status(200).json(matches);
  } catch (error) {
    return next(error);
  }
}

async function getHeadToHead(req, res, next) {
  try {
    const { player1, player2 } = req.query;
    const headToHead = await readHeadToHead(player1, player2);
    return res.status(200).json(headToHead);
  } catch (error) {
    return next(error);
  }
}

async function getPlayer(req, res, next) {
  try {
    const { id } = req.params;
    const player = await readPlayer(id);
    return res.status(200).json(player);
  } catch (error) {
    return next(error);
  }
}

async function deletePlayer(req, res, next) {
  try {
    const { id } = req.params;
    await removePlayer(id);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  postPlayer,
  getPlayers,
  postMatch,
  getMatches,
  getHeadToHead,
  getPlayer,
  deletePlayer,
};