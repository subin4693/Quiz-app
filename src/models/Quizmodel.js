import { Schema, models, model } from "mongoose";

const QuizSchema = new Schema({
    topic: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    option1: {
        type: String,
        required: true,
    },
    option2: {
        type: String,
        required: true,
    },
    option3: {
        type: String,
        required: true,
    },
    option4: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

const Quiz = models.Quiz || model("Quiz", QuizSchema);

export default Quiz;
