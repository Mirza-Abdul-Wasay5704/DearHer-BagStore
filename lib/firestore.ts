// lib/firestore.ts — Firestore CRUD operations for products
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ──────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  patternType: string;
  colors: string[];
  size: string;
  material: string;
  featured: boolean;
  stock: number;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

export type ProductInput = Omit<Product, "id" | "createdAt" | "updatedAt">;

const PRODUCTS_COLLECTION = "products";

// ─── Read Operations ────────────────────────────────────

/** Fetch all products */
export async function getAllProducts(): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/** Fetch a single product by slug */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("slug", "==", slug)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() } as Product;
}

/** Fetch a single product by ID */
export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Product;
}

/** Fetch featured products */
export async function getFeaturedProducts(): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    where("featured", "==", true),
    orderBy("createdAt", "desc"),
    limit(8)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
}

/** Realtime listener for all products */
export function onProductsSnapshot(
  callback: (products: Product[]) => void
): () => void {
  const q = query(
    collection(db, PRODUCTS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    callback(products);
  });
  return unsubscribe;
}

// ─── Write Operations ───────────────────────────────────

/** Add a new product */
export async function addProduct(
  data: ProductInput
): Promise<string> {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Update an existing product */
export async function updateProduct(
  id: string,
  data: Partial<ProductInput>
): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/** Delete a product */
export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await deleteDoc(docRef);
}

/** Toggle featured status */
export async function toggleFeatured(
  id: string,
  featured: boolean
): Promise<void> {
  await updateProduct(id, { featured });
}
