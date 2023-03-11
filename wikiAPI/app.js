//Init Setup
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.set('strictQuery', true); //Avoids Deprecation Warning
mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true}); //Connects to DB

//Schema and model for Articles
const articleSchema = {
    title: String,
    content: String
};
const Article = mongoose.model("Article", articleSchema);


app.route("/articles")
    .get(function(req, res){
        Article.find({}, function(err, foundArticles){
            if(!err){
                res.send(foundArticles);
            }else{
                res.send(err);
            }
        });
    })
    
    .post(function(req,res){

        const newArticle = new Article({
            title : req.body.title,
            content : req.body.content
        });
    
        newArticle.save(function(err){
            if(!err){
                res.send("Succesfully saved");
            }else{
                res.send(err);
            }
        });    
    
    })
    
    .delete(function(req,res){

        Article.deleteMany({},function(err){
            if(!err){
                res.send("Succesfully deleted");
            }else{
                res.send(err);
            }
        });    
    
    });

    app.route("/articles/:title")
        .get(function(req, res){

            Article.findOne({title: req.params.title}, function(err, foundArticle){
                if(foundArticle){
                    res.send(foundArticle);
                }else{
                    res.send("No article with that title found!");
                }
            });
        })

        .put(function(req, res){
            
            Article.findOneAndUpdate(
                {title: req.params.title}, 
                {title : req.body.title, content : req.body.content},
                {overwrite : true},
                function(err){
                if(!err){
                    res.send("Succesfully updated by PUT.");
                }else{
                    res.send(err);
                }
              });

        })

        .patch(function(req, res){
            
            Article.findOneAndUpdate(
                {title: req.params.title}, 
                {$set : req.body},
                function(err){
                if(!err){
                    res.send("Succesfully updated by PATCH.");
                }else{
                    res.send(err);
                }
              });

        })

        .delete(function(req,res){

            Article.deleteOne(
                {title: req.params.title}, 
                function(err){
                if(!err){
                    res.send("Succesfully deleted selected article");
                }else{
                    res.send(err);
                }
            });    
        
        });

        

app.listen(3000, function(){
    console.log("Listening at port 3000");
})