var express = require('express');
var router = express.Router();
var user_service = require('../services/user_service');
var auth_service = require('../services/auth_service');

/* GET users listing. */
router.get('/', auth_service.jwtMiddleWare, function(req, res, next) {
  user_service.getUsers((err, data) => {
      if (!err) {
          return res.json(data);
      } else {
          return res.status(500).send(ERROR);
      }
  });
});

router.put('/:id', (req, res, next) => {
  user_service.updateUser(req.params.id, req.body, (err, data) => {
      if (!err) {
          return res.json(data);
      } else {
          return res.status(500).send(ERROR);
      }
  });
});

router.delete('/:id', (req, res, next) => {
  user_service.deleteUserById(req.params.id, (err, data) => {
      if (!err) {
          return res.sendStatus(200);
      } else {
          return res.status(500).send(ERROR);
      }
  });
});

router.post('/login', (req, res, next) => {
    console.log("Express > user.js >>>>" + JSON.stringify(req.body));
    user_service.login(req.body, (err, data) => {
      if (!err) {
            const token = auth_service.sign(JSON.stringify(data));
            if (data !== null) {
                data.password = '';
                console.log("Express > user.js > before response >>>>" + JSON.stringify(data) + " >>token>>" +
                            token);
                return res.status(200).json({"user": data, "token": token});
            } else {
                return res.status(200).json(); //invalid
            }
            
      } else {
            return res.status(500).send(ERROR);
      }
  });
});

router.post('/register', (req, res, next) => {
    user_service.createUser(req.body, (err, data) => {
      if (!err) {
          return res.sendStatus(200);
      } else {
          return res.status(500).send(ERROR);
      }
    });
});

module.exports = router;
