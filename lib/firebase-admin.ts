// lib/firebase-admin.ts — Firebase Admin SDK for server-side operations
// Uses the service account JSON from the project root
// NOTE: This file must ONLY be imported in server-side code (API routes, server components)

import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import fs from "fs";

let adminApp: App;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Load service account from project root
  const serviceAccountFile = path.resolve(
    process.cwd(),
    "dearher-bagstore-firebase-adminsdk-fbsvc-844c64117b.json"
  );

  if (!fs.existsSync(serviceAccountFile)) {
    throw new Error(
      `Firebase Admin SDK service account not found at: ${serviceAccountFile}`
    );
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountFile, "utf8"));

  adminApp = initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });

  return adminApp;
}

/** Firebase Admin Auth instance */
export const adminAuth = getAuth(getAdminApp());

/** Firebase Admin Firestore instance */
export const adminDb = getFirestore(getAdminApp());

export default getAdminApp;
