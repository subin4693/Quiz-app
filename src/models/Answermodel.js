import { models, model, Schema } from "mongoose";

const Answermodel = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        correct_answers: {
            type: Number,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Answer = models.Answer || model("Answer", Answermodel);

export default Answer;
