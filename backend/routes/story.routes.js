const express = require("express");
const router = express.Router();

const storyController = require("./story.controller");

router.get("/", storyController.getStories);
router.get("/:id", storyController.getStory);
router.post("/", storyController.createStory);
router.put("/:id", storyController.updateStory);
router.delete("/:id", storyController.deleteStory);

module.exports = router;
