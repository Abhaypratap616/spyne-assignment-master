const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");
const { createDiscussion } = require("../../controllers/discussion/discussion");
const {
  updateDiscussion,
  deletDiscussion,
} = require("../../controllers/discussion/modifyDiscussion");
const { likeOnDiscusion , likeOnComment} = require("../../controllers/discussion/like");
const { commentOnDiscusion, replyOnComment } = require("../../controllers/discussion/comment");

// create discussion
// upload.single("image") => upload single file
// upload.fields("otherImages") => upload multiple files
router.post(
  "/create-discussion",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "otherImages" }]),
  createDiscussion
);

// update discussion
router.put(
  "/update-discussion/:discussionId",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "otherImages" }]),
  updateDiscussion
);
// delete discussion
router.delete("/delete-discussion/:discussionId", deletDiscussion);

//like discussion
router.put("/like-discussion/:discussionId", likeOnDiscusion);

//commen on discussion
router.put("/comment-on-discussion/:discussionId", commentOnDiscusion);

//reply on comment
router.put("/reply-on-discussion/:commentId", replyOnComment);

//like on comment
router.put("/like-on-comment/:commentId", likeOnComment);


module.exports = router;
