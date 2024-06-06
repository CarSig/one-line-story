const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Story = require("../models/Story.Model");

exports.getStories = (req, res) => {
  Story.find()
    .then((chats) => {
      res.json(chats);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getStory = (req, res) => {
  const { id } = req.params;
  Story.findById(id)
    .then((chat) => {
      console.log("chat found :" + JSON.stringify(chat));
      res.json(chat);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createStory = (req, res) => {
  console.log("story created");
  const newStory = req.body;
  console.log("story created :" + JSON.stringify(req.body));
  const chat = new Story(newStory);

  chat
    .save()
    .then((chat) => {
      res.json(chat);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateStory = (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  console.log("payload :", payload);

  const updatedChat = {
    sentences: payload.sentenceArray,
    count: payload.count,
    completed: payload.completed,
  };

  console.log("updatedChat :" + JSON.stringify(updatedChat));
  Story.findByIdAndUpdate(id, updatedChat, { new: true })
    .then((chat) => {
      res.json(chat);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteStory = (req, res) => {
  const { id } = req.params;
  Story.findByIdAndDelete(id)
    .then((chat) => {
      res.json(chat);
    })
    .catch((err) => {
      console.log(err);
    });
};
