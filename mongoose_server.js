var mongoose = require('mongoose'),
    assert = require('assert');

//user module variable
var Users = require('/users');

// Connection URL
var url = ''; //Add MongoDB URL here


// Connect using mongoose
mongoose.connect(url,{ useNewUrlParser: true });
//open a connection and get a db handler
var db = mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open',  ()=> {
    Users.create(
        {name:"Jeff",
        description:"x",
        address: "1234testSt",
        },
        (err,user)=>{
            if(err) throw err;
            console.log("user created");
            console.log(user);
            let id = user.id;
        }
    );	
    Users.find({},(err,users)=>{
        // object of all the users
        assert.equal(err,null);
        console.log(users);
    });
        
        db.collection('users').drop(function (){
            db.close();
        });
});