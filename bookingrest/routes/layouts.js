var express = require('express');
var router = express.Router();
var layout_service = require('../services/layout_service');

const ERROR = "Something went wrong."

router.get('/', (req, res, next) => {
    layout_service.getLayouts((err, data) => {
        if (!err) {
            return res.json(data);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

router.post('/', (req, res, next) => {
    layout_service.createLayout(req.body, (err, data) => {
        if (!err) {
            return res.sendStatus(200);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

router.get('/:id', (req, res, next) => {
    layout_service.getLayoutById(req.params.id, (err, data) => {
        if (!err) {
            return res.json(data);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

router.put('/:id', (req, res, next) => {
    layout_service.updateLayout(req.params.id, req.body, (err, data) => {
        if (!err) {
            return res.json(data);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

router.delete('/:id', (req, res, next) => {
    layout_service.deleteLayoutById(req.params.id, (err, data) => {
        if (!err) {
            return res.sendStatus(200);
        } else {
            return res.status(500).send(ERROR);
        }
    });
});

module.exports = router;