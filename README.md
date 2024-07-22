## Learn Express Js Jaya Jaya Jaya Notes
1. Run Project
   ```bash
   - npm run init (buat project)
   - npm run ... (isi sesuai dengan kebutuhan)
   
   // -- berikut adalah helper command terminal : -- //
   "start" : "nodemon server.js",
    "migrate": "sequelize db:migrate",
    "db:seed" : "sequelize db:seed:all",
    "migrate:fresh" : "sequelize db:migrate:undo:all && sequelize db:migrate",
    "migrate:fresh --seed" : "sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:all"
   ```
2. Basic Query Sequelize
   ```bash
   https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
   ```
3. Validation Request
   ```bash
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
   ```
4. Ambil Data dari Token Id User
   ```bash
   1. pertama tambahkan middleware pada route init
   // define enpoint another page with Middleware Route to Assign Id Token User
   router.post('/posts', authMiddleware.checkAuth ,postController.index);

   2. lalu ambil id dengan passing di controller init
    const requestPost = {
        title: req.body.title,
        description: req.body.description,
        userId: req.userData.id // helper dari ROUTE yaitu MIDDLEWARE untuk ambil Id USER
    };

   3. lalu kamu bisa pakai dimana saja

   4. lalu ada juga params id dari route /:id
   const id = req.params.id;

   ```
5. Setup Model Relasi
   ```bash
     static associate(models){
      Post.belongsTo(models.User);
      Post.belongsTo(models.Category);
      Post.hasMany(models.Comment);
    }
   ```
6. Include Relasi Tunggal Dan Jamak
   ```bash
     models.Post.findOne({
            where: { id: id },

            // -- relasi include dan didalam include berjamak -- //
            include: [
                // --- ini tunggal yaitu 1  aja -- //
                { model: models.User },
                { model: models.Category},
                // --- inijamak masuk dari model comment lalu di include lagi ambil user id nya dengan model User --- //
                { 
                    model: models.Comment,
                    include: [{ model: models.User }]
                  }
            ]
   ```
7. Mapping Data In Express
   ```bash
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
   ```
8. Image Uploader
   ```bash
   https://github.com/gedehariyogananda/express-tooltip/blob/main/helper/helper_image_uploader.txt
   ```
9. Catetan dikit :
   ```bash
   https://github.com/gedehariyogananda/express-tooltip/blob/main/catetan.txt
   ```
    
   
