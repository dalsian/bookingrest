var express = require('express');
var router = express.Router();
var movie_service = require('../services/movie_service');

const ERROR = "Something went wrong."

router.get('/', (req, res, next) => {
    movie_service.getMovies((err, data) => {
        if (!err) {
            return res.json(data);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

router.post('/', (req, res, next) => {
    movie_service.createMovie(req.body, (err, data) => {
        if (!err) {
            return res.sendStatus(200);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

/**
 * :id searches _id field containing ObjectId.
 */
router.get('/:id', (req, res, next) => {
    movie_service.getMovieById(req.params.id, (err, data) => {
        if (!err) {
            return res.json(data);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

router.put('/:id', (req, res, next) => {
    movie_service.updateMovie(req.params.id, req.body, (err, data) => {
        if (!err) {
            return res.json(data);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

router.delete('/:id', (req, res, next) => {
    movie_service.deleteMovieById(req.params.id, (err, data) => {
        if (!err) {
            return res.sendStatus(200);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

/**
 * Search based on various criteria. The crietia is a JSON object passed 
 * through request body.  All search parameters are case insensitive.
 * Example criteria object...
 * { 
 *   "title" : "Batman",
 *   "status" : "Coming Soon"
 * }
 */
router.post('/search', (req, res, next) => {
    movie_service.searchMovies(req.body, (err, data) => {
        if (!err) {
            return res.send(data);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

module.exports = router;