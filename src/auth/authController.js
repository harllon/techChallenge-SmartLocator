var User = require('../database/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config');

const authUser = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({auth: false, message: 'No token provided.'});
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate the token.'});
        return res.status(200).send(decoded);
    });
};

const loginUser = async (req, res, next) => {
    const {email, password} = JSON.parse(req.body)
    await User.findOne({where: { email: email }}).then(value => {
        if(!value) return res.status(404).send({
            auth: false, 
            token: null, 
            message: "User not founded."
        });
        var passwordIsValid = bcrypt.compareSync(password, value.password);
        if(!passwordIsValid) return res.status(401).send({
            auth: false, 
            token: null,
            message: 'Invalid Password'
        });
        var token = jwt.sign({id: value.id}, config.secret, {
            expiresIn: 86400
        })
        return res.status(200).send({
            auth: true, 
            token: token,
            message: 'Authentication succeeded'
        });
    }).catch(err => {
        return res.status(500).send({message: 'Server error.'});
     });
}
const logoutUser = (req, res, next) => {
    return res.status(200).send({auth: false, token: null});
}


module.exports = {
    authUser,
    loginUser,
    logoutUser,
  }