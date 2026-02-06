// scripts/setup-admin.ts
// Creates the admin user in Firebase Auth and Firestore using the Admin SDK.
//
// Usage:
//   npx tsx scripts/setup-admin.ts

import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import * as path from "path";

// ─── Configuration ──────────────────────────────────
const ADMIN_EMAIL = "admin@dearher.com";
const ADMIN_PASSWORD = "DearHer@2026"; // Change this immediately after first login!
const SERVICE_ACCOUNT_PATH = path.resolve(
  __dirname,
  "../dearher-bagstore-firebase-adminsdk-fbsvc-844c64117b.json"
);

// ─── Initialize Admin SDK ───────────────────────────
// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(SERVICE_ACCOUNT_PATH);

const app = initializeApp({
  credential: cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const auth = getAuth(app);
const db = getFirestore(app);

// ─── Main ───────────────────────────────────────────
async function setupAdmin() {
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log("║         Dear Her — Admin Setup Script            ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  try {
    // Step 1: Create or fetch the Firebase Auth user
    let uid: string;
    try {
      const existingUser = await auth.getUserByEmail(ADMIN_EMAIL);
      uid = existingUser.uid;
      console.log(`✓ Admin user already exists: ${ADMIN_EMAIL} (${uid})`);
    } catch {
      const newUser = await auth.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        displayName: "Dear Her Admin",
      });
      uid = newUser.uid;
      console.log(`✓ Created admin user: ${ADMIN_EMAIL} (${uid})`);
    }

    // Step 2: Create or update the Firestore user document with admin role
    await db.collection("users").doc(uid).set(
      {
        email: ADMIN_EMAIL,
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );
    console.log(`✓ Set admin role in Firestore for UID: ${uid}`);

    console.log("\n──────────────────────────────────────────────────");
    console.log(`  Email:    ${ADMIN_EMAIL}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log(`  UID:      ${uid}`);
    console.log("──────────────────────────────────────────────────");
    console.log("\n⚠  Change the password after first login!");
    console.log("✅ Admin setup complete. You can now log in at /login\n");
  } catch (error: any) {
    console.error("\n❌ Setup failed:", error.message || error);

    if (
      error.message?.includes("no configuration") ||
      error.code === "auth/configuration-not-found"
    ) {
      console.log("\n╔══════════════════════════════════════════════════╗");
      console.log("║  Firebase Authentication is not enabled yet!     ║");
      console.log("╠══════════════════════════════════════════════════╣");
      console.log("║                                                  ║");
      console.log("║  1. Go to: https://console.firebase.google.com  ║");
      console.log("║  2. Select project: dearher-bagstore            ║");
      console.log("║  3. Click: Authentication (left sidebar)        ║");
      console.log("║  4. Click: Get Started                          ║");
      console.log("║  5. Click: Email/Password → Enable → Save       ║");
      console.log("║  6. Run this script again:                      ║");
      console.log("║     npm run setup-admin                         ║");
      console.log("║                                                  ║");
      console.log("╚══════════════════════════════════════════════════╝");
    }

    process.exit(1);
  }

  process.exit(0);
}

setupAdmin();
