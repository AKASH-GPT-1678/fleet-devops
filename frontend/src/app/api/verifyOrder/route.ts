import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { updatePremiumStatus } from "@/lib/updateStatus";
import { after } from "next/server";

export interface VerifyBody {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    token : string
}


export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, token }: VerifyBody = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing required parameters", success: false }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_SECRET_KEY as string;
    if (!secret) return NextResponse.json({ error: "Razorpay secret not found", status: 400 });

    const HMAC = crypto.createHmac("sha256", secret);
    HMAC.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = HMAC.digest("hex");

    if (generatedSignature === razorpay_signature) {
      console.log("token", token);

     
      after(async () => {
        try {
          await updatePremiumStatus(token);
        } catch (err) {
          console.error("Failed to update premium status", err);
        }
      });

      return NextResponse.json({ message: "Payment verified successfully", success: true });

    } else {
      return NextResponse.json({ error: "Invalid signature", success: false }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: "An error occurred", success: false, msg: error }, { status: 500 });
  }
}