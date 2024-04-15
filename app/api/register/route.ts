import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { username, proof, publicSignals } = await request.json();
    await connectMongoDB();
    console.log('Registering user', username, proof, publicSignals);
    await User.create({ username, proof, publicSignals });
    return NextResponse.json({ message: "User registered" }, { status: 201 })
}