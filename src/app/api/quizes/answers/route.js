import connect from "@/utils/database";

import Quizmodel from "@/models/Quizmodel";
import Answermodel from "@/models/Answermodel";
import TotalAns from "@/models/Totalanswermodel";

import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connect();
        const { email, answers, topic } = await req.json();
        let totalAnswers = 0;

        for (let i = 0; i < answers.length; i++) {
            if (answers[i]) {
                const answerFromDb = await Quizmodel.findOne({
                    _id: answers[i].id,
                }).select("answer");

                if (answers[i].answer === answerFromDb.answer) {
                    totalAnswers++;
                }
            }
        }

        await Answermodel.create({
            email,
            correct_answers: totalAnswers,
            topic,
        });

        const dbTotalAns = await TotalAns.findOne({ email });

        if (!dbTotalAns) {
            await TotalAns.create({
                email,
                correct_ans: totalAnswers,
                total_quiz: 5,
            });
        } else {
            dbTotalAns.correct_ans = dbTotalAns.correct_ans + totalAnswers;
            dbTotalAns.total_quiz = dbTotalAns.total_quiz + 5;
            await dbTotalAns.save();
        }

        return new NextResponse(
            JSON.stringify(
                { message: "success", totalAnswers },
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
