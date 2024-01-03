import { Schema, models, model } from "mongoose";

const TopicSchema = new Schema({
    topic: {
        type: String,
        unique: true,
        required: true,
    },
});

const Topic = models.Topic || model("Topic", TopicSchema);

export default Topic;
