import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Quizmodel from "@/models/Quizmodel";
import Topicmodel from "@/models/Topicmodel";

export const POST = async (res) => {
    const { quiz, topic } = await res.json();

    try {
        await connect();

        const gettopic = await Topicmodel.findOne({ topic });

        if (!gettopic) {
            const createtopic = await Topicmodel.create({ topic });
        }
        for (let i = 0; i < quiz.length; i++) {
            if (
                !quiz[i].question ||
                !quiz[i].option1 ||
                !quiz[i].option2 ||
                !quiz[i].option3 ||
                !quiz[i].option4
            )
                continue;
            const res = await Quizmodel.create({ ...quiz[i], topic });
        }

        return new NextResponse(
            JSON.stringify({ success: true }, { status: 201 }),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
};
