// scripts/test-storage.ts — Test if Firebase Storage is properly set up
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

const serviceAccountPath = path.resolve(
  process.cwd(),
  "dearher-bagstore-firebase-adminsdk-fbsvc-844c64117b.json"
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "dearher-bagstore.firebasestorage.app",
  });
}

async function testStorage() {
  console.log("🔍 Testing Firebase Storage...\n");

  const bucket = admin.storage().bucket();

  try {
    // Try to check if bucket exists
    const [exists] = await bucket.exists();
    if (!exists) {
      console.error("❌ Storage bucket does NOT exist!");
      console.log("\n👉 You need to ENABLE Firebase Storage:");
      console.log("   1. Go to: https://console.firebase.google.com/project/dearher-bagstore/storage");
      console.log("   2. Click 'Get Started'");
      console.log("   3. Choose 'Start in test mode' → Next");
      console.log("   4. Select a location (e.g. us-central1) → Done");
      return;
    }
    console.log("✓ Storage bucket exists:", bucket.name);

    // Try to upload a small test file
    const testData = Buffer.from("Dear Her Storage Test - " + new Date().toISOString());
    const testFile = bucket.file("_test/connection-test.txt");

    await testFile.save(testData, {
      contentType: "text/plain",
      metadata: { cacheControl: "no-cache" },
    });
    console.log("✓ Upload test PASSED — Storage is working!\n");

    // Clean up test file
    await testFile.delete().catch(() => {});
    console.log("✓ Cleanup done\n");
    console.log("✅ Firebase Storage is fully operational!");
    console.log("   You can now add products with images.\n");

  } catch (error: unknown) {
    const err = error as { code?: number; message?: string; errors?: Array<{reason?: string}> };
    console.error("❌ Storage test FAILED:", err.message);

    if (err.code === 404 || err.message?.includes("Not Found") || err.message?.includes("does not exist")) {
      console.log("\n👉 Firebase Storage is NOT enabled yet.");
      console.log("   1. Go to: https://console.firebase.google.com/project/dearher-bagstore/storage");
      console.log("   2. Click 'Get Started'");
      console.log("   3. Choose 'Start in test mode' → Next");
      console.log("   4. Select a location → Done");
    } else if (err.code === 403 || err.message?.includes("Permission")) {
      console.log("\n👉 Storage exists but rules are blocking access.");
      console.log("   Go to Firebase Console → Storage → Rules and set:");
      console.log("   allow read, write: if request.auth != null;");
    } else {
      console.log("\nFull error:", JSON.stringify(err, null, 2));
    }
  }
}

testStorage();
