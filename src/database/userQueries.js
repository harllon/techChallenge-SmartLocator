const User = require('./user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../auth/config')

const getUsers = async (req, res, next) => {
    await User.findAll().then(value => {
        return res.status(200).json(value);
      }).catch(err => {
        console.log(err);
      });
}
const getUserById = async (req, res, next) => {
    const id = parseInt(req.params.id)
    await User.findByPk(id).then(value => {
        return res.status(200).json(value);
      }).catch(err => {
        console.log(err);
      });
}

const createUser = async (req, res, next) => {
    const {name, email, password} = req.body;
    var hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({
        name: name,
        email: email,
        password: hashedPassword
    }).then(value => {
        console.log(value);
        var token = jwt.sign({id: value.id}, config.secret, {
            expiresIn: 86400
        });
        return res.status(201).send({
          auth: true, 
          token: token,
          message: 'User created'
        });

      }).catch(err => {
        console.log(err);
        return res.status(500).send({message: "There was a problem registering the user."})
      });
}

const updateUser = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body;
    await User.findByPk(id).then(async value => {
        value.name = name;
        value.email = email;
        await value.save().then(value => {
            return res.status(200).send({message: `User modified with ID: ${id}`})
        }).catch(err => {
            console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });
}

const deleteUser = async (req, res, next) => {
    const id = parseInt(req.params.id)
    await User.findByPk(id).then(value => {
        value.destroy()
        return res.status(200).send({message: `User deleted with ID: ${id}`})
      }).catch(err => {
        console.log(err);
      });
}


module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }

