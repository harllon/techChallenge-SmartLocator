const User = require('./user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../auth/config');
const path = require('path');

const getUsers = async (req, res, next) => {
    await User.findAll().then(value => {
        res.status(200).json(value);
      }).catch(err => {
        console.log(err);
      });
}
const getUserById = async (req, res, next) => {
    const id = parseInt(req.params.id)
    await User.findByPk(id).then(value => {
        res.status(200).json(value);
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
        var token = jwt.sign({ id: value.id }, config.secret, {
            expiresIn: 86400 // expira em 24 horas
        });
        res.status(201).send({ auth: true, token: token });
        //res.status(201).send(`User added with ID: ${value.id}`);
      }).catch(err => {
        console.log(err);
        res.status(500).send("Ocorreu um problema ao registrar o usuário.")
      });
}

const updateUser = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const { name, email } = req.body
    await User.findByPk(id).then(async value => {
        value.name = name;
        value.email = email;
        await value.save().then(value => {
            res.status(200).send(`User modified with ID: ${id}`)
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
        res.status(200).send(`User deleted with ID: ${id}`)
      }).catch(err => {
        console.log(err);
      });
}

const authUser = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token informado.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
      
      res.status(200).send(decoded);
    });
  };

const loginUser = async (req, res, next) => {
    const {email, password} = JSON.parse(req.body)

    await User.findOne({where: { email: email }}).then(value => {
        if (!value) return res.status(404).send('Usuário não encontrado.');
            
        var passwordIsValid = bcrypt.compareSync(password, value.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
            
        var token = jwt.sign({ id: value.id }, config.secret, {
            expiresIn: 86400 // expira em 24 horas
        })
            
        res.status(200).send({ auth: true, token: token });
        //res.status(200).render(path.join(__dirname, '/beer.html'));
    }).catch(err => {
        console.log(err);
        res.status(500).send('Erro no servidor.');
     });
}
const logoutUser = (req, res, next) => {
    res.status(200).send({ auth: false, token: null });
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    authUser,
    loginUser,
    logoutUser,
  }

