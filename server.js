const express = require('express');
const cors = require('cors');
const app = express();

const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(cors())
//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//database connection
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'dilip',
      password : '',
      database : 'mydatabase'
    }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(9000,function(){
    console.log('server started running on port 9000');
})
