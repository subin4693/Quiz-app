import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    iscredential: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const User = models.User || model("User", UserSchema);
export default User;
