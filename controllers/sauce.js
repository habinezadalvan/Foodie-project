const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createPosts = (req, res, next) =>{

    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
    });
   sauce.save().then( () => {
        res.status(201).json({
            message: 'your post was created successfully'
        });
   }).catch((error) =>{
        res.status(400).json({
            error:error
        });
   }); 
};

exports.getposts = (req, res, next) =>{
    Sauce.find().then((sauces) =>{
        res.status(200).json(sauces);
    }).catch((error) =>{
        res.status(400).json({
            error: error
        });
    });
};

exports.getOnePost = (req, res, next) =>{
    Sauce.findOne({_id: req.params.id}).then((sauce) =>{
        res.status(200).json(sauce);
    }).catch((error) =>{
        res.status(404).json({
            error: error
        });
    });
};

exports.modifyOne = (req, res, next) =>{

    let sauce = new Sauce({ _id: req.params._id });
    if (req.file) {
      const url = req.protocol + '://' + req.get('host');
      req.body.sauce = JSON.parse(req.body.sauce);
      sauce = {
        _id: req.params.id,
        userId: req.body.sauce.userId,
        name: req.body.sauce.name,
        manufacturer: req.body.sauce.manufacturer,
        description: req.body.sauce.description,
        mainPepper: req.body.sauce.mainPepper,
        imageUrl: url + '/images/' + req.file.filename,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
      };
    } else {
      sauce = {
        _id: req.params.id,
        userId: req.body.userId,
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
      };
    }
    Sauce.updateOne({_id: req.params.id}, sauce).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
};

exports.deletePost = (req, res, next) =>{
    Sauce.findOne({_id:req.params.id}).then((sauce) =>{
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink('images/' + filename, () =>{
            Sauce.deleteOne({_id:req.params.id}).then(()=>{
                res.status(200).json({
                    message: 'Post deleted successfully'
                });
            }).catch((error) =>{
                res.status(400).json({
                    error:error
                });
            });
        });
    });

   
};