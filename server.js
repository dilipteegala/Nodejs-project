const express = require('express')
const app = express()

const bcrypt = require('bcrypt-nodejs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const database ={
   users : [
        {
            id : 1,
            name:'d',
            email:'dilip@mail.com',
            password:'banana',
            entries:0,
            joinedDate: new Date()
        },{
            id : 2,
            name:'t',
            email:"dilipNew@mail.com",
            password:'banana',
            entries:0,
            joinedDate: new Date()
        }]
}

//Intiall get call
app.get('/', function (req, res) {
    res.json(database.users);
})

//sigin post call
app.post('/siginin',(req,res)=>{
    let user_email = req.body.email;
    let user_password = req.body.password;
    console.log(user_email,user_password)
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
        res.json('sucess')        
    } else {
        res.status(400).json('Not a user');
    }
    
})

//register
app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
        // Store hash in your password DB.
    }).then(storeHashInDatabase);

    const storeHashInDatabase = (hash) => {  
        // Store the hash in your password DB
        return hash // For now we are returning the hash for testing at the bottom
     }

    database.users.push({
        id : 3,
        name:name,
        email:email,
        password:hash,
        entries:0,
        joinedDate: new Date()
    })
    // console.log(req.body);
    res.send(database.users[database.users.length - 1]);
})

app.get('/profile/:id',function(req,res){
    const {id}  = req.params;
    let found = false;

    database.users.forEach(user =>{   
        if (user.id == id) {   
            found = true;
           return res.json(user)
        }
    })
    if(!found){
        res.status(400).json("Not found");
    }
})

app.put('/image',function(req,res){
    const {id}  = req.body;
    let found = false;

    database.users.forEach(user =>{   
        if (user.id == id) {   
            found = true;
            user.entries ++
           return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json("Not found");
    }
})

app.listen(9000,function(){
    console.log('server started running on port 9000');
})