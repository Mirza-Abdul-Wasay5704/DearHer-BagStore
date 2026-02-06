// scripts/get-firebase-config.ts — Fetch Firebase web app config and update .env.local
import * as admin from "firebase-admin";
import * as fs from "fs";
import * as path from "path";

const PROJECT_ID = "dearher-bagstore";

const serviceAccountPath = path.resolve(
  process.cwd(),
  "dearher-bagstore-firebase-adminsdk-fbsvc-844c64117b.json"
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: PROJECT_ID,
  });
}

async function getAccessToken(): Promise<string> {
  const credential = admin.credential.cert(serviceAccount);
  const tokenResult = await credential.getAccessToken();
  return tokenResult.access_token;
}

async function fetchJson(url: string, token: string, options?: RequestInit) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });
  return res.json();
}

async function main() {
  console.log("🔍 Fetching Firebase web app configuration...\n");

  const token = await getAccessToken();
  const baseUrl = `https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}`;

  // 1. List existing web apps
  let data = await fetchJson(`${baseUrl}/webApps`, token);

  let appId: string;

  if (!data.apps || data.apps.length === 0) {
    console.log("⚠  No web app registered. Creating one...");
    const createResult = await fetchJson(`${baseUrl}/webApps`, token, {
      method: "POST",
      body: JSON.stringify({ displayName: "Dear Her Web" }),
    });

    if (createResult.error) {
      console.error("❌ Failed to create web app:", createResult.error.message);
      console.log("\n👉 Manual steps:");
      console.log("   1. Go to https://console.firebase.google.com/project/dearher-bagstore/settings/general");
      console.log("   2. Scroll to 'Your apps' → Click 'Add app' → Choose Web (</>)");
      console.log("   3. Name it 'Dear Her Web' → Register app");
      console.log("   4. Copy the firebaseConfig values into .env.local");
      process.exit(1);
    }

    // Wait for creation to propagate
    console.log("   Waiting for app registration...");
    await new Promise((r) => setTimeout(r, 5000));

    data = await fetchJson(`${baseUrl}/webApps`, token);
    if (!data.apps || data.apps.length === 0) {
      console.error("❌ Web app creation is still pending. Please try again in a minute.");
      process.exit(1);
    }
    appId = data.apps[0].appId;
    console.log(`✓ Created web app: ${data.apps[0].displayName} (${appId})\n`);
  } else {
    appId = data.apps[0].appId;
    console.log(`✓ Found web app: ${data.apps[0].displayName || "Unnamed"} (${appId})`);
  }

  // 2. Get the web app config
  const config = await fetchJson(`${baseUrl}/webApps/${appId}/config`, token);

  if (config.error) {
    console.error("❌ Failed to fetch config:", config.error.message);
    process.exit(1);
  }

  console.log("\n📋 Firebase Web Config:");
  console.log("   apiKey:            ", config.apiKey);
  console.log("   authDomain:        ", config.authDomain);
  console.log("   projectId:         ", config.projectId);
  console.log("   storageBucket:     ", config.storageBucket);
  console.log("   messagingSenderId: ", config.messagingSenderId);
  console.log("   appId:             ", config.appId);

  // 3. Update .env.local
  const envPath = path.resolve(process.cwd(), ".env.local");
  let envContent = fs.readFileSync(envPath, "utf-8");

  const replacements: Record<string, string> = {
    NEXT_PUBLIC_FIREBASE_API_KEY: config.apiKey,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: config.authDomain,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: config.projectId,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: config.storageBucket,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: config.messagingSenderId,
    NEXT_PUBLIC_FIREBASE_APP_ID: config.appId,
  };

  for (const [key, value] of Object.entries(replacements)) {
    if (value) {
      const regex = new RegExp(`^${key}=.*$`, "m");
      envContent = envContent.replace(regex, `${key}=${value}`);
    }
  }

  fs.writeFileSync(envPath, envContent, "utf-8");
  console.log("\n✅ .env.local updated with real Firebase config!");
  console.log("\n👉 Restart the dev server (npm run dev) for changes to take effect.");
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
