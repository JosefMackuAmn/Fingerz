const express = require('express');

const gameController = require('../controllers/game');

const router = express.Router();

router.get('/', gameController.getIndex);

//router.get('/sea', gameController.getSea);
//router.get('/game/:levelId', gameController.getGame);

//router.post('/result', gameController.postResult);

module.exports = router;