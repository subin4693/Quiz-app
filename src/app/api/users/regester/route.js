import { NextResponse } from "next/server";
import connect from "@/utils/database";
import User from "@/models/Usermodel";
import bcrypt from "bcryptjs";

export async function POST(req) {
 
    const { name, email, password } = await req.json();
    try {
        await connect();

        const isExists = await User.findOne({ email, iscredential: true });

        if (isExists) {
            throw new Error("Emailid already exists");
        }

        
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                name,
                email,
                password: hashedPassword,
                iscredential: true,
            });
        
        return NextResponse.json(
            { message: "user Registered" },
            { status: 201 },
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "faild", error }, { status: 500 });
    }
}
