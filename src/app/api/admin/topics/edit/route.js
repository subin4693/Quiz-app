import { NextResponse } from "next/server";
import Quizmodel from "@/models/Quizmodel";
import Topicmodel from "@/models/Topicmodel";

import connect from "@/utils/database";

export async function GET(req) {
    try {
        await connect();

        const { searchParams } = new URL(req.url);
        const search = searchParams && searchParams.get("search");

        const res = await Quizmodel.find({ topic: search });

        return new NextResponse(
            JSON.stringify(
                { message: "success", response: res },
                { status: 200 },
            ),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
}

export async function PUT(req) {
    try {
        const { id, quiz } = await req.json();
        await connect();

        if (!id || !quiz) throw new Error("send valid quiz or id");

        const dbQuiz = await Quizmodel.findById({ _id: id });

        if (!dbQuiz) throw new Error("Not a valid id");

        dbQuiz.question = quiz.question;
        dbQuiz.option1 = quiz.option1;
        dbQuiz.option2 = quiz.option2;
        dbQuiz.option3 = quiz.option3;
        dbQuiz.option4 = quiz.option4;
        dbQuiz.answer = quiz.answer;

        await dbQuiz.save();

        return new NextResponse(
            JSON.stringify({ message: "success" }, { status: 201 }),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
}

export async function DELETE(req) {
    await connect();
    try {
        const { searchParams } = new URL(req.url);
        const deleteTopic = searchParams.get("d");

        await Topicmodel.deleteOne({ topic: deleteTopic });

        await Quizmodel.deleteMany({ topic: deleteTopic });

        return new NextResponse(
            JSON.stringify({ message: "success" }, { status: 201 }),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
}
