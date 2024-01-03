import Topicmodel from "@/models/Topicmodel";
import connect from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connect();
        const res = await Topicmodel.find();

        return new NextResponse(
            JSON.stringify({ topics: res }, { status: 200 }),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
}
