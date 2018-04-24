var jwt = require('jsonwebtoken');
const serverJWT_Secret = 'iOiJKV1QiLCJhbGciOiJSUzI1NiIs';

module.exports =  {
    jwtMiddleWare : (req, res, next) => {
        const authString = req.headers['authorization'];
        if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
            const authArray = authString.split(' ');
            const token = authArray[1];
            jwt.verify(token, serverJWT_Secret, (err, plain) => {
                if (!err) {
                    req.decoded = plain;
                    next();
                } else {
                    res.sendStatus(403);
                }
            });
        } else {
            res.sendStatus(403);
        }
    },
    sign : (data) => jwt.sign(data, serverJWT_Secret)
};
