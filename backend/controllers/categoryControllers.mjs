import Category from "../models/categoryModel.mjs";
import Post from "../models/postModel.mjs";
import asyncHandler from "express-async-handler";

// @desc Get categories
// @route GET /api/categories
// @access Public
export const getGategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200);
  res.send(categories);
});

// @desc Add category
// @route POST /api/categories
// @access Private
export const addCategory = asyncHandler(async (req, res) => {
  const { name, color } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please add a name for the category");
  }
  const catExists = await Category.findOne({ name });
  if (catExists) {
    res.status(400);
    throw new Error("Category already exists");
  }
  const category = await Category.create({ name, color });
  res.status(200);
  res.send(category);
});

// @desc Update category
// @route PUT /api/categories/:id
// @access Private
export const updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }
  const updatedGoal = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200);
  res.send(updatedGoal);
});
// @desc Delete category
// @route DELETE /api/categories/:id
// @access Private
export const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(400);
    throw new Error("Category not found");
  }
  const posts = Post.find({ category: id });
  await posts.remove();
  await category.remove();
  res.status(200);
  res.send({ id });
});
