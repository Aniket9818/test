var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer  = require('multer');
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');
var upload = multer({ dest: 'uploads/' });
var authController = require("./Controllers/AuthController.js");
var userController = require("./Controllers/UserController.js");

// app.get('/hospitallist',function(req,res,next){
//     console.log(req.query);
//     res.send('req recieved');
// })
// app.listen(3001);

var swaggerDefinition = {
    info:{
        title:'myApplication',
        description: 'This is my app documentation',
        version: '1.0.0' //(New release,sometimes not backward compatible).(New feature, backward compatibility).(bug fix, backward compatibility)
    },
    securityDefinitions: {
        bearerAuth:{
            type:'apiKey',
            name:'authorization',
            in:'header',
            scheme:'bearer',
        }
    },
    host:'localhost:3002',
    basePath:'/'
};

var swaggerOptions = {
    swaggerDefinition,
    apis:['./index.js']
};

var swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpecs));

app.use(bodyParser.urlencoded({extended:true}));

/**
* @swagger
* /registration:
*  post:
*   tags:
*    - Users
*   description: Users registration testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   parameters:
*    - name: username
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique username
*    - name: password
*      in: formData
*      type: string
*      required: true
*      description: Please provide unique password
*   responses:
*    200:
*     description: registered successfully
*    204:
*     description: username is required
*    409:
*     description: user already exist
*    500:
*     description: User not found
*/

/**
* @swagger
* /users/{id}:
*  delete:
*   tags:
*    - Delete user
*   description: Delete user from token testing
*   produces:
*    - application/json
*   consumes:
*    - application/x-www-form-urlencoded
*   security:
*    - bearerAuth: []
*   parameters:
*    - name: id
*      in: path
*      required: true
*      description: please enter id
*   responses:
*    500:
*     description: User not found
*/


app.post('/registration',userController.Validator,userController.UserExist,
userController.genHash,userController.Register);
app.post('/profile', upload.single('image'),userController.UploadImage);
app.delete('/users/:id',authController.verifyToken,userController.deleteuser);
app.post('/login',authController.validation,authController.passwordChecker,
authController.jwtTokenGen);

module.exports = app;


app.listen(3002);