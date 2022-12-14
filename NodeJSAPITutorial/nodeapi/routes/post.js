// files serves as middelware to our application

const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();

router.get("/", postController.getPosts);
router.post("/post", postController.createPosts);

module.exports = router;
