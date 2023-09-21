const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/article");

router.post("/create", ArticleController.create);
router.get("/articles/:recent?",ArticleController.getArticles);
router.get("/article/:id",ArticleController.one);

module.exports = router;