import { NextResponse } from "next/server";
import Usermodel from "@/models/Usermodel";
import connect from "@/utils/database";
import Answermodel from "@/models/Answermodel";
import TotalAns from "@/models/Totalanswermodel";

export async function GET(req) {
    try {
        await connect();

        const { searchParams } = new URL(req.url);

        const email = searchParams.get("email");
        const quizAnswers = await Answermodel.find({ email });
        const totalans = await TotalAns.findOne({ email });

        return new NextResponse(
            JSON.stringify(
                {
                    message: "success",
                    totalans,
                    answersData: quizAnswers,
                },
                { status: 200 },
            ),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: "faild", error }, { status: 500 }),
        );
    }
}
