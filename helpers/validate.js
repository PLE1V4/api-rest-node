const validator = require("validator");

const validateArticle = (param) => {
   
    let validate_title = !validator.isEmpty(param.title) &&
                        validator.isLength(param.title, {min: 4, max: undefined});
    let validate_content = !validator.isEmpty(param.content);

    if(!validate_title ||  ! validate_content){
        throw new Error("Not Validated Data");
    }

}

module.exports = {
    validateArticle
}