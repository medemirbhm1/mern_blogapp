import Post from "../models/postModel.mjs";
import Category from "../models/categoryModel.mjs";
import asyncHandler from "express-async-handler";

// @desc Get Posts
// @route GET /api/posts
// @access Public
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.status(200);
  res.send(posts);
});
// @desc Add Post
// @route POST /api/posts
// @access Private
export const addPost = asyncHandler(async (req, res) => {
  const { text, category } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please add Text");
  }
  const post = await Post.create({
    text,
    category,
  });
  res.status(200).send(post);
});

// @desc Get Post
// @route GET /api/posts/:id
// @access Public
export const getPost = (req, res) => {
  res.status(200);
  res.send(req.params.id);
};
// @desc Update Post
// @route PUT /api/posts/:id
// @access Private
export const updatePost = (req, res) => {};
// @desc Delete Post
// @route DELETE /api/posts/:id
// @access Private
export const deletePost = (req, res) => {
  res.status(200);
  res.send("hi");
};
