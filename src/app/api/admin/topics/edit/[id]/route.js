import { NextResponse } from "next/server";
import connect from "@/utils/database";
import Quizmodel from "@/models/Quizmodel";

// export async function GET(req, { params }) {
//     try {
//         await connect();
//         const { id } = params;
//         console.log(id);

//         const response = await Quizmodel.findById({ _id: id });
//         if (!response) {
//             throw new Error("Quiz is not exists");
//         }

//         return new NextResponse(
//             JSON.stringify({ message: "success", response }, { status: 200 }),
//         );
//     } catch (error) {
//         console.log(error);
//         return new NextResponse(
//             JSON.stringify({ message: "faild" }, { status: 500 }),
//         );
//     }
// }

export async function DELETE(res, { params }) {
    await connect();
    try {
        await Quizmodel.deleteOne({ _id: params.id });

        return new NextResponse(
            JSON.stringify({ message: "success" }, { status: 201 }),
        );
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }, { status: 500 }));
    }
}
