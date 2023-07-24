import express from "express";
import formidable from "express-formidable";
import {
  commentController,
  createPost,
  getAllPosts,
  getUserpost,
  likeController,
  photoController,
} from "../controller/posts.js";
import {
  getAllVedios,
  uploadController,
  vedioController,
  vediocommentController,
  vediolikeController,
} from "../controller/vedios.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

router.get("/getpost", getAllPosts);
router.get("/photo/:pid", photoController);
router.get("/userpost/:id", getUserpost);
router.put("/likepost/:id", likeController);
router.put("/:id/comment", commentController);
router.post("/create-post", formidable(), createPost);
router.get("/getvedio", getAllVedios);
router.get("/vedio/:pid", vedioController);
router.put("/likevedio/:id", vediolikeController);
router.put("/:id/comment", vediocommentController);
router.post("/create-vedio", singleUpload, formidable(), uploadController);

export default router;
