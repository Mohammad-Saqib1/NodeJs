import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // other user fields
  subscription: {
    type: Object,
    required: true,
  },
});

mongoose
  .connect(
    "mongodb+srv://test:test@test.om6s0x4.mongodb.net/?retryWrites=true&w=majority&appName=Test"
  )
  .then((d) => {
    console.log("db-connected");
  })
  .catch((e) => {
    console.log("error", e);
  });

const User = mongoose.model("User", userSchema);
export default User;


