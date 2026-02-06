// scripts/fix-firestore-rules.ts — Restore correct Firestore rules (user accidentally put Storage rules there)
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
    projectId: "dearher-bagstore",
  });
}

async function getAccessToken(): Promise<string> {
  const credential = admin.credential.cert(serviceAccount);
  const tokenResult = await credential.getAccessToken();
  return tokenResult.access_token;
}

const CORRECT_FIRESTORE_RULES = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null &&
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }
  }
}`;

async function main() {
  console.log("🔧 Fixing Firestore security rules...\n");

  const token = await getAccessToken();
  const projectId = "dearher-bagstore";

  // Deploy correct Firestore rules
  const releaseUrl = `https://firebaserules.googleapis.com/v1/projects/${projectId}/rulesets`;

  // Step 1: Create a new ruleset
  const createRes = await fetch(releaseUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: {
        files: [
          {
            name: "firestore.rules",
            content: CORRECT_FIRESTORE_RULES,
          },
        ],
      },
    }),
  });

  const rulesetData = await createRes.json();

  if (rulesetData.error) {
    console.error("❌ Failed to create ruleset:", rulesetData.error.message);
    console.log("\n👉 Please manually update Firestore rules:");
    console.log("   1. Go to https://console.firebase.google.com/project/dearher-bagstore/firestore/rules");
    console.log("   2. Replace ALL content with the correct Firestore rules (see firestore.rules file)");
    return;
  }

  console.log("✓ Created new Firestore ruleset:", rulesetData.name);

  // Step 2: Release the ruleset to Firestore
  const releaseUpdateUrl = `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases/cloud.firestore`;

  const releaseRes = await fetch(releaseUpdateUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      release: {
        name: `projects/${projectId}/releases/cloud.firestore`,
        rulesetName: rulesetData.name,
      },
    }),
  });

  const releaseData = await releaseRes.json();

  if (releaseData.error) {
    console.error("❌ Failed to deploy rules:", releaseData.error.message);
    console.log("\n👉 Please manually update Firestore rules in the console.");
    return;
  }

  console.log("✓ Deployed Firestore rules successfully!");
  console.log("\n✅ Firestore rules are now correct (products: public read, admin write)");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
});
