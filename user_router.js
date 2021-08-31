//Server that handles REST requests for recipes url

var express = require('express');
var recipesRouter = express.Router();
/** 1- declare mongoose and users**/
const mongoose = require('mongoose');
let recipes = require('../models/recipes');
recipesRouter.route('/') 
.get((req,res,next)=>{ //chained into route(), no semi-colon after the all implementation
      // 2- implement get  to return all recipes  
  	  recipes.find({}, (err, recipes)=>{  //get the recipes collection as an array,received as the recipe param
		   if (err) throw err; //propagate error
        // convert to json and return in res
        res.json(recipes);
	   });
	   
})

.post((req, res, next)=>{
	// 3- implement post request to insert recipe into database
	recipes.create(req.body,  (err, recipe)=>{
		   if(err) throw err; //propagate error
		   
		   console.log('recipe created');
		   var id = recipe._id
		   res.writeHead(200, {'Content-Type':'text-plain'}); //send reply back to the client with recipe id
		   res.end('Added the recipe with id: ' + id);
		     
	});
})

.delete((req, res, next)=>{
       // 4- delete deletes all recipes in the collection
	   recipes.remove({},(err, resp)=>{
		    if (err) throw err; //propagate error
			
			res.json(resp);
		});
});

recipesRouter.route('/:recipeId') // a second router is define using parameters.

.get((req,res,next)=>{
	
	  // 4- find by id 
      recipes.findById(req.params.recipeId, (err, recipe)=>{  //get the recipes collection as an array,received as the recipe param
		   if (err) throw err; //propagate error
		   res.json(recipe); // convert to Json and return in res
	   });
	 })

.put((req, res, next)=>{
	// 5- implement post request to update a specific recipe
	recipes.findByIdAndUpdate();
        
})

.delete((req, res, next)=>{
      // 6- delete specific recipe in the collection
	   recipes.findByIdAndRemove(req.params.recipeId,  (err, resp)=>{        
				if (err) throw err;
				res.json(resp);
		});
});

/**
  7- added the comments routing and handling
**/
recipesRouter.route('/:recipeId/comments')
.get( (req, res, next)=>{
    recipes.findById(req.params.recipeId,  (err, recipe)=>{
        if (err) throw err;
      //return recipe.comments
        res.json(recipe.comments);
    });
})

.post( (req, res, next)=>{
    recipes.findById(req.params.recipeId,  (err, recipe)=>{
        if (err) throw err;
        recipe.comments.push(req.body);
        recipe.save((err,recipe)=>{
            if (err) throw err;
            console.log("Comments updated");
            res.json(recipe);
        })
	});
})

.delete( (req, res, next)=>{
    recipes.findById(req.params.recipeId,  (err, recipe)=>{
        if (err) throw err;
        for(let i = (recipe.comments.length-1);i>=0; i--){
            recipe.comments.id(recipe.comments[i]._id).remove();
        }
    });
    
});

recipesRouter.route('/:recipeId/comments/:commentId')
.get( (req, res, next)=>{
    recipes.findById(req.params.recipeId,  (err, recipe)=>{
        if (err) throw err;
        //return the comment using commentid in the respond object
        res.json(recipe.comments.id(req.params.commentId));
    });
})

.put( (req, res, next)=>{
    // We delete the existing commment and insert the updated
    // comment as a new comment
    recipes.findById(req.params.recipeId,  (err, recipe)=>{
        if (err) throw err;
            recipe.comments.id(req.params.commentId).remove();
            recipe.comments.push(req.body);
            recipe.save((err,recipe)=>{
                if (err) throw err;
                console.log("Comments updated");
                res.json(recipe);
            })
        });
})

.delete( (req, res, next)=>{
    recipes.findById(req.params.recipeId,  (err, recipe)=>{
        recipe.comments.id(req.params.commentId).remove(); //remove a single comment
        recipe.save( (err, resp)=>{
            if (err) throw err;
            res.json(resp);
        });
    });
});


module.exports = usersRouter;