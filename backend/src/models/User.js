const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// This defines what a User looks like in the database
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // removes extra spaces
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // no two users can have same email
      lowercase: true, // always save as lowercase
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never return password in queries automatically
    },
    role: {
      type: String,
      enum: ["admin", "pharmacist"], // only these two values allowed
      default: "pharmacist",
    },
    isActive: {
      type: Boolean,
      default: true, // account is active by default
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// This runs BEFORE saving user to database
// It automatically hashes the password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Method to check if password is correct during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);