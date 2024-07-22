const models = require('../models');
const Validator = require('fastest-validator');

// ------- EXAMPLE QUERYING EXPRESS, VALIDATION, PASSING ID TOKEN, QUERY ID PARAM, RELATIONSHIP MODEL BINDING ------- //

function index(req, res){
    const requestPost = {
        title: req.body.title,
        description: req.body.description,
        userId: req.userData.id // helper dari ROUTE yaitu MIDDLEWARE untuk ambil Id USER
    };

    // ---- validasi untuk schema requestPost -- //
    const schemaValidate = {
        title: { type:"string", optional:false, max: "100" },
        description: { type:"string", optional:false, max: "500" },
        userId: { type:"number", optional:false }
    }

    const validator = new Validator();
    const validateResponse = validator.validate(requestPost, schemaValidate);

    // --- pengecekan validasi --- //
    if(validateResponse !== true){
        return res.status(400).json({
            success: false,
            message: "failed post data",
            error: validateResponse
        });
    }

    // ---- create post -- //
    models.Post.create(requestPost).then(result => {
        res.status(201).json({
            success: true,
            message: "success post data",
            data: result
        });
    }).catch(err => {
        res.status(404).json({
            success: false,
            message: "failed post data",
            error: err
        });
    });
}

// --------- example relasi model binding ----------------------- //

function show(req, res) {
    const id = req.params.id;
    try {

        // -- find one harus ada Where Query nya, dan findByPk tidak perlu where query -- //
        models.Post.findOne({
            where: { id: id },

            // -- relasi include dan didalam include berjamak -- //
            include: [
                { model: models.User },
                { model: models.Category},
                { 
                    model: models.Comment,
                    include: [{ model: models.User }]
                  }
            ]
        }).then(result => {
            if (!result) {
                return res.status(404).json({
                    success: false,
                    message: "Failed to get data",
                    data: {}
                });
            } else {
                const mappedData = {
                    id: result.id,
                    title: result.title,
                    description: result.description,
                    categoryPost: result.Category ? result.Category.nameCategory : null, 
                    author: result.User ? result.User.name : null, 

                    // cara mapping datas
                    comments : result.Comments ? result.Comments.map(comment => {
                        return {
                            id: comment.id,
                            comment: comment.comment,
                            pengkomentar: comment.User ? comment.User.name : null,
                        }
                    }) : null  
                };
                return res.status(200).json({
                    success: true,
                    message: "Success get data",
                    data: mappedData
                });
            }
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: "Failed to get data",
                data: err
            });
        });

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Failed to get data",
            data: e
        });
    }
}


// ------- update example query -------------- //
function update(req,res){
    const id = req.params.id;
    const userId = req.userData.id;

    const post = {
        title: req.body.title,
        description: req.body.description,
        userId: userId
    }

    const schemaValidate = {
        title: { type:"string", optional:false, max: "100" },
        description: { type:"string", optional:false, max: "500" }
    }

    const validator = new Validator();
    const validateResponse = validator.validate(post, schemaValidate);

    if(validateResponse !== true){
        return res.status(400).json({
            success: false,
            message: "failed post data",
            error: validateResponse
        });
    }
    
    // cek user id dengan post apakah sesuai 
    models.Post.findOne({where : {id : id}}).then(result => {
        if(result == null){
            return res.status(404).json({
                success: false,
                message: "gada post e"
            });        
        }

        if(result.userId != userId){
            return res.status(404).json({
                success: false,
                message: "bukan post kamu"
            });
        }

        // update data 
        result.update(post).then(result => {
            res.status(200).json({
                success: true, 
                message: "post update data berhasil",
                data: result
            });
        }).catch(err => {
            res.status(404).json({
                success: false,
                message: "failed post data",
                error: err
            });
        });

    }).catch(err => {
        res.status(500).json({
            success: false,
            message: "something went wrong",
            error: err
        });
    });
}

module.exports = {
    index: index,
    show: show,
    update: update,
}