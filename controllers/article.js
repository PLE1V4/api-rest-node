const validator = require("validator");
const Article = require("../models/Article");

const create = (req, res) => {

    let param = req.body;

    try{

        let validate_title = !validator.isEmpty(param.title) &&
                            validator.isLength(param.title, {min: 4, max: undefined});
        let validate_content = !validator.isEmpty(param.content);

        if(!validate_title ||  ! validate_content){
            throw new Error("Not Validated Data");
        }

    }catch(error){
        return res.status(400).json({
            status: 'error',
            mensaje: "Data missing"
        })
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
                mensaje: "Can't found Articles"
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

module.exports = {
    create,
    getArticles
}