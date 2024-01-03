import TotalAns from "@/models/Totalanswermodel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connect();
        const res = await TotalAns.find().sort({ correct_ans: -1 });

        return new NextResponse(
            JSON.stringify({ message: "success", res }, { status: 200 }),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
}
