const express = require("express");
const multer = require("multer");
const router = express.Router();

const ArticleController = require("../controllers/article");

const localStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./img/articles/');
    },
    filename: function(req, file, cb){
        cb(null, "article"+Date.now()+file.originalname);
    }
});

const uploads = multer({storage: localStorage});

router.post("/create", ArticleController.create);
router.post('/upload-image/:id',[uploads.single("file")],ArticleController.upload);

router.get("/articles/:recent?",ArticleController.getArticles);
router.get("/article/:id",ArticleController.one);
router.get("/image/:file",ArticleController.image)
router.get("/search/:query",ArticleController.search);

router.delete("/article/:id",ArticleController.del);

router.put("/article/:id",ArticleController.edit);



module.exports = router;