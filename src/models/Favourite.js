import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    title: String,
    poster_path: String,
  },
  { timestamps: true }
);

export default mongoose.models.Favourite ||
  mongoose.model("Favourite", favouriteSchema);
