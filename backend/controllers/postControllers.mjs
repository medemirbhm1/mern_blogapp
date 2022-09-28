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
  const { text, categoryId } = req.body;
  if (!text || !categoryId) {
    res.status(400);
    throw new Error("Please add Text and Category");
  }
  const cat = await Category.findById(categoryId);
  if (!cat) {
    res.status(400);
    throw new Error("No category with that id");
  }
  const post = await Post.create({
    text,
    category: categoryId,
  });
  const nb = cat.get("postNb");
  await cat.update({ postNb: nb + 1 });
  res.status(200).send(post);
});
// @desc Get Post
// @route GET /api/posts/:id
// @access Public
export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.status(400);
    throw new Error("No post with that id");
  }
  res.status(200);
  res.send(post);
});
// @desc Update Post
// @route PUT /api/posts/:id
// @access Private
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.status(400);
    throw new Error("No post with that id");
  }
  const newPost = await post.updateOne(req.body, { new: true });
  res.status(200).send(newPost);
});
// @desc Delete Post
// @route DELETE /api/posts/:id
// @access Private
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.status(400);
    throw new Error("No Post with that id");
  }
  const postCategoryId = post.get("category");
  const category = await Category.findById(postCategoryId);
  let postNb = category.get("postNb");
  postNb--;
  await category.update({ postNb });
  await post.remove();
  res.status(200);
  res.send({ id });
});
