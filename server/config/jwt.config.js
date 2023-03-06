const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports.authenticate = (req, res, next) => {

    jwt.verify(req.cookies.adminToken, SECRET, (err, payload) => {
        if (err) {
            console.log(err)
            jwt.verify(req.cookies.userToken, SECRET, (err, payload) => {
                if (err) {
                    console.log(err)
                    res.status(401).json({ verified: false });
                }else{
                    next();
                }
            });
        } else{
            next();
        }
    });

}

module.exports.authenticateAdmin = (req, res, next) => {
    jwt.verify(req.cookies.adminToken, SECRET, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}