import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { username, proof} = await request.json();
    await connectMongoDB();
    console.log('Registering user', username, proof);
    const user = await User.findOne({ username }).exec();

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    //const isValid = verifyProof(proof, user.proof);

    //if (!isValid) {
    //    return NextResponse.json({ message: "Invalid proof" }, { status: 400 })
    //}
    //else {
    //    return NextResponse.json({ message: "Valid proof" }, { status: 200 })
    //}
    return NextResponse.json({ message: "User registered" }, { status: 201 })
}

function verifyProof(proof: any, userProof: any, publicSignals: any) {
    const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

    const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);
}