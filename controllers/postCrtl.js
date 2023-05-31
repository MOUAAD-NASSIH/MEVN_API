import Post from "../models/Post.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const fetchPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const imageName = req.file.filename;
  post.image = imageName;
  try {
    await Post.create(post);
    res.status(201).json({ message: "Post created successfully!" });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  let new_image = "";
  // check if there is a file uploaded with the req.body to delete it
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync(`${__dirname}/../uploads/${req.body.old_image}`);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }

  const newPost = req.body;
  newPost.image = new_image;
  try {
    await Post.findByIdAndUpdate(id, newPost);
    res.status(200).json({ message: "Post updated successfully !!" });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Post.findByIdAndDelete(id);
    if (result.image != "") {
      try {
        fs.unlinkSync(`${__dirname}/../uploads/${result.image}`);
      } catch (err) {
        console.log(err);
      }
    }
    res.status(200).json({ message: "Post deleted successfully!!" });
  } catch (err) {
    res.status(404).json(err.message);
  }
};
