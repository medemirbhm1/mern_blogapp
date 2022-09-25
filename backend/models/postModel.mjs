import mongoose from "mongoose";
const postSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "Please add a category"],
      ref: "Category",
    },
    comments: {
      type: Array,
      of: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    },
  },
  {
    timeStamps: true,
  }
);
const postModel = mongoose.model("Post", postSchema);

export default postModel;
