import Quizmodel from "@/models/Quizmodel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connect();
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        const quizs = await Quizmodel.find({ topic: search }).select(
            "_id question option1 option2 option3 option4",
        );
        return new NextResponse(
            JSON.stringify({ message: "success", quizs }, { status: 200 }),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
}
