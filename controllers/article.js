const fs = require("fs");
const path = require("path");

const Article = require("../models/Article");
const {validateArticle} = require("../helpers/validate");
const { error } = require("console");

const create = (req, res) => {

    let param = req.body;

    try{
        validateArticle(param);
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Data Missing"
        });
    }


    const article = new Article(param);

    article.save().then((sArticle) => {
        if (!sArticle){
            return res.status(400).json({
                status: 'error',
                mensaje: "Data not saved"
            });
        }

        return res.status(200).json({
            status: "success",
            article: sArticle,
            message: "Article created successfully"
        })
    })
    .catch((error) => {

        return res.status(400).json({
            status: 'error',
            mensaje: "Data not saved"
        });
    });
   
}

const getArticles = (req, res) => {
    
    let query = Article.find({});

    if(req.params.recent){
        query.limit(3);
    }
    
                        
    query.sort({date: -1})
         .then((articles) => {

        if(!articles){
            return res.status(404).json({
                status: 'error',
                mensaje: "Can't find Articles"
            });
        }

        return res.status(200).send({
            status: "success",
            articles
        })

    }).catch((error) =>{
        return res.status(404).json({
            status: 'error',
            mensaje: "Unexpected Error"
        });
    });
}

const one = (req, res) => {

    let id = req.params.id;

    Article.findById(id).then((article) => {
        if(!article){
            return res.status(404).json({
                status: 'error',
                mensaje: "Article Not Found"
            }); 
        }

        return res.status(200).send({
            status: "success",
            article
        });
    }).catch((error) =>{
        return res.status(404).json({
            status: 'error',
            mensaje: "Unexpected Error"
        });
    });

}

const del = (req, res) => {

    let id = req.params.id;

    Article.findOneAndDelete({_id: id}).then((delArticle) => {
        if(!delArticle){
            return res.status(404).json({
                status: 'error',
                mensaje: "Article Not Found"
            }); 
        }

        return res.status(200).send({
            status: "success",
            article: delArticle,
            message: "Article deleted"
        });
    }).catch((error) =>{
        return res.status(500).json({
            status: 'error',
            mensaje: "Unexpected Error"
        });
    });

}

const edit = (req,res) => {

    let id = req.params.id;
    let param = req.body;
   
    try{
        validateArticle(param);
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Data Missing"
        });
    }

    Article.findOneAndUpdate({_id: id}, req.body, {new:true}).then((newArticle) => {
        if(!newArticle){
            return res.status(404).json({
                status: 'error',
                mensaje: "Article Not Found"
            }); 
        }

        return res.status(200).json({
            status: "success",
            article: newArticle
        });
    }).catch((error) =>{
        return res.status(500).json({
            status: 'error',
            mensaje: "Unexpected Error"
        });
    });

}

const upload = (req, res) => {

    if(!req.file && !req.files){
        return res.status(404).json({
            status: "error",
            message: "Invalid Request"
        });
    }

    let fileName = req.file.originalname;
    let split_file = fileName.split("\.");
    let extension = split_file[1];

    if(extension != "png" &&  extension != "jpg" && extension != "jpeg" && extension != "gif"){
        fs.unlink(req.file.path, (error) =>{
            return res.status(400).json({
                status: "error",
                message: "Unsupported File Format"
            });
        });
    }else{
        
        let id = req.params.id;
          
        Article.findOneAndUpdate({_id: id}, {img: req.file.filename }, {new:true}).then((newArticle) => {
            if(!newArticle){
                return res.status(404).json({
                    status: 'error',
                    mensaje: "Article Not Found"
                }); 
            }

            return res.status(200).json({
                status: "success",
                article: newArticle
            });
        }).catch((error) =>{
            return res.status(500).json({
                status: 'error',
                mensaje: "Unexpected Error"
            });
        });

    }
   
}

const image = (req, res) => {
    let file = req.params.file;
    let file_path = "./img/articles/"+file;

    fs.stat(file_path, (error, exist) => {
        if(exist){
            return res.sendFile(path.resolve(file_path));
        }else{
            return res.status(404).json({
                status: "error",
                message: "File Not Found"
            });
        }
    });
}

const search = (req, res) => {

    let lookup = req.params.query;

    Article.find({ "$or": [
        {"title": { "$regex": lookup, "$options": "i"}},
        {"content": { "$regex": lookup, "$options": "i"}}
    ]})
    .sort({date: -1})
    .then((foundArticles) => {
        if(!foundArticles || foundArticles.length <= 0){
            return res.status(404).json({
                status: "error",
                message: "Cant find Articles meeting the criteria"
            });
        }

        return res.status(200).json({
            status: "success",
            articles: foundArticles
            })
    })
    .catch((error) => {
        return res.status(400).json({
            status: "error",
            message: "Unexpected Error"
        });
    });

}

module.exports = {
    create,
    getArticles,
    one,
    del,
    edit,
    upload,
    image,
    search
}