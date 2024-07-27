const express = require("express");
const router = express.Router();

const { getAllDiscussion, getDiscussion, getDiscussionByTextSearch, getDiscussionByTags } = require("../../controllers/discussion/discussion");

router.get("/get-all-discussion", getAllDiscussion);
router.get("/get-discussion/:discussionId", getDiscussion);
router.get("/get-discussion-by-text-search/:text", getDiscussionByTextSearch);
router.get("/get-discussion-by-tags", getDiscussionByTags); // pass tags in query

module.exports = router;
