const models = require('../models');
const Validator = require('fastest-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// --------- JWT SETUP AUTHENTICATE --------------- //

function register(req, res){
    
    // findOne harus ada where nya kalau findByPk gausah //
    models.User.findOne({where : {email: req.body.email}}).then(result => {
        if(result){
            return res.status(400).json({
                success: true,
                message: "email already exists"
            });
        }

        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, function(err, hash){
                const user = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                }
    
                const schemaValidate = {
                    name: { type:"string", optional:false, max: "100" },
                    email: { type:"string", optional:false },
                    password: { type:"string", optional:false, min: "6" }
                }
    
                const validator = new Validator();
                const validateResponse = validator.validate(user, schemaValidate);
    
                if(validateResponse !== true){
                    return res.status(400).json({
                        success: false,
                        message: "failed register data",
                        error: validateResponse
                    });
                }
    
                models.User.create(user).then(result => {
                    res.status(201).json({
                        success: true,
                        message: "success register data",
                        data: result
                    });
                }).catch(err => {
                    res.status(404).json({
                        success: false,
                        message: "failed register data",
                        error: err
                    });
                });
            });
        });
    }).catch(err => {
        return res.status(404).json({
            success: false,
            message: "failed register data",
            error: err
        });
    });
   
}


function login(req, res){
    const schemaValidate = {
        email: { type:"email", optional:false },
        password: { type:"string", optional:false, min: "6" }
    }

    const validator = new Validator();
    const validateResponse = validator.validate(req.body, schemaValidate);

    if(validateResponse !== true){
        return res.status(400).json({
            success: false,
            message: "failed login data",
            error: validateResponse
        });
    }

    // findOne harus ada where nya kalau findByPk gausah //
    models.User.findOne({ where : {email: req.body.email}}).then(user => { 
        if(!user){
            return res.status(404).json({
                success: false,
                message: "email not found"
            });
        }

        bcrypt.compare(req.body.password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }

                jwt.sign(payload, process.env.JWT_KEY, {expiresIn: 3600}, (err, token) => {
                    res.json({
                        success: true,
                        message : 'Your token has been signed',
                        data: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token: token
                        }
                       
                    });
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "password incorrect"
                });
            }
        });
    });
}

module.exports = {
    register: register,
    login: login
}
