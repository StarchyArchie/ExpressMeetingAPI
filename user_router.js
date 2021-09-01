//Server that handles REST requests for users url

var express = require('express');
var usersRouter = express.Router();
/** 1- declare mongoose and users**/
const mongoose = require('mongoose');
let users = require('./users');
usersRouter.route('/') 
.get((req,res,next)=>{ //chained into route(), no semi-colon after the all implementation
      // 2- implement get  to return all users  
  	  users.find({}, (err, users)=>{  //get the users collection as an array,received as the user param
		   if (err) throw err; //propagate error
        // convert to json and return in res
        res.json(users);
	   });
	   
})

.post((req, res, next)=>{
	// 3- implement post request to insert user into database
	users.create(req.body,  (err, user)=>{
		   if(err) throw err; //propagate error
		   
		   console.log('user created');
		   var id = user._id
		   res.writeHead(200, {'Content-Type':'text-plain'}); //send reply back to the client with user id
		   res.end('Added the user with id: ' + id);
		     
	});
})

.delete((req, res, next)=>{
       // 4- delete deletes all users in the collection
	   users.remove({},(err, resp)=>{
		    if (err) throw err; //propagate error
			
			res.json(resp);
		});
});

usersRouter.route('/:userId') // a second router is define using parameters.

.get((req,res,next)=>{
	
	  // 4- find by id 
      users.findById(req.params.userId, (err, user)=>{  //get the users collection as an array,received as the user param
		   if (err) throw err; //propagate error
		   res.json(user); // convert to Json and return in res
	   });
	 })

.put((req, res, next)=>{
	// 5- implement post request to update a specific user
	users.findByIdAndUpdate();
        
})

.delete((req, res, next)=>{
      // 6- delete specific user in the collection
	   users.findByIdAndRemove(req.params.userId,  (err, resp)=>{        
				if (err) throw err;
				res.json(resp);
		});
});

/**
  7- added the address routing and handling
**/
usersRouter.route('/:userId/address')
.get( (req, res, next)=>{
    users.findById(req.params.userId,  (err, user)=>{
        if (err) throw err;
      //return user.address
        res.json(user.address);
    });
})

.post( (req, res, next)=>{
    users.findById(req.params.userId,  (err, user)=>{
        if (err) throw err;
        user.address.push(req.body);
        user.save((err,user)=>{
            if (err) throw err;
            console.log("address updated");
            res.json(user);
        })
	});
})

.delete( (req, res, next)=>{
    users.findById(req.params.userId,  (err, user)=>{
        if (err) throw err;
        for(let i = (user.address.length-1);i>=0; i--){
            user.address.id(user.address[i]._id).remove();
        }
    });
    
});

usersRouter.route('/:userId/address/:addressId')
.get( (req, res, next)=>{
    users.findById(req.params.userId,  (err, user)=>{
        if (err) throw err;
        //return the address using addressid in the respond object
        res.json(user.address.id(req.params.addressId));
    });
})

.put( (req, res, next)=>{
    // We delete the existing commment and insert the updated
    // address as a new address
    users.findById(req.params.userId,  (err, user)=>{
        if (err) throw err;
            user.address.id(req.params.addressId).remove();
            user.address.push(req.body);
            user.save((err,user)=>{
                if (err) throw err;
                console.log("address updated");
                res.json(user);
            })
        });
})

.delete( (req, res, next)=>{
    users.findById(req.params.userId,  (err, user)=>{
        user.address.id(req.params.addressId).remove(); //remove a single address
        user.save( (err, resp)=>{
            if (err) throw err;
            res.json(resp);
        });
    });
});


module.exports = usersRouter;