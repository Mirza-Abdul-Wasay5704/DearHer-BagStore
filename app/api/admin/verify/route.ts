// app/api/admin/verify/route.ts — Server-side admin verification endpoint
// Uses Firebase Admin SDK to verify tokens server-side

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Dynamically import to avoid issues in edge runtime
    const { adminAuth, adminDb } = await import("@/lib/firebase-admin");

    // Verify the Firebase ID token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // Check admin role in Firestore
    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (!userDoc.exists || userDoc.data()?.role !== "admin") {
      return NextResponse.json({ error: "Not an admin" }, { status: 403 });
    }

    return NextResponse.json({
      uid,
      email: decodedToken.email,
      role: "admin",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Token verification error:", message);
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}
