const validator = require("validator");
const Article = require("../models/Article");

const test = (req, res) => {

    return res.status(200).json({
        message: "Test Action"
    });

}

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

module.exports = {
    test,
    create
}