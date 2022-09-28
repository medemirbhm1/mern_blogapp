import mongoose from "mongoose";
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for the category"],
    },
    color: {
      type: String,
      required: [true, "Please add a color"],
    },
      postNb: Number,
  },
  {
    timestamps: true,
  }
);
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
