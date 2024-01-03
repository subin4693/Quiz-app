import mongoose, { Schema, models, model } from "mongoose";

const TotalAnsmodel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    correct_ans: {
        type: Number,
        required: true,
        default: 0,
    },
    total_quiz: {
        type: Number,
        required: true,
        default: 0,
    },
});

const TotalAns = models.TotalAns || model("TotalAns", TotalAnsmodel);
export default TotalAns;
