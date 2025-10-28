import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import products from "../db/data.json";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,
  authDomain: "dragoncardsz.firebaseapp.com",
  projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID,
  storageBucket: "dragoncardsz.firebasestorage.app",
  messagingSenderId: "485189983856",
  appId: import.meta.env.VITE_FIRESTORE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//Functions
export async function getAllProducts() {
  const productsCollection = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollection);

  const documents = productsSnapshot.docs;
  const data = documents.map(doc => doc.data());
  
  return data;
}

export async function getProductById(id) {
  const productsCollection = collection(db, "products");
  const querySnapshot =  query(productsCollection, where("id", "==", Number(id)));

  const productsSnapshot = await getDocs(querySnapshot);
  const documents = productsSnapshot.docs;
  const data = documents.map(doc => doc.data());

  console.log("Product fetched by ID from Firestore:", data);
  return data[0];
}

export async function getWeeklyProducts() {
  const productsCollection = collection(db, "products");
  const querySnapshot =  query(productsCollection, where("is_weekly", "==", true));

  const productsSnapshot = await getDocs(querySnapshot);
  const documents = productsSnapshot.docs;
  const data = documents.map(doc => doc.data());

  console.log("Fetched weekly products from Firestore:", data);
  return data;
}

export async function getProductByCategory(category) {
  const productsCollection = collection(db, "products");
  const querySnapshot =  query(productsCollection, where("category", "==", category));

  const productsSnapshot = await getDocs(querySnapshot);
  const documents = productsSnapshot.docs;
  const data = documents.map(doc => doc.data());

  console.log(`Fetched products in category "${category}" from Firestore:`, productsSnapshot);
  console.log(data);
  return data;
}

//Functios to Create Orders
export async function createOrder(orderData) {
  const ordersCollection = collection(db, "orders");
  const newOrderDoc = await addDoc(ordersCollection, orderData);
  
  return newOrderDoc.id;
}

//Another functions
export async function exportProductToFirestore(){
  const productsCollection = collection(db, "products");

  for (let product of products) {
    const docRef = await addDoc(productsCollection, product);
    console.log("Document written with ID: ", docRef.id);
    console.log("Document created:", docRef);
  }

  console.log("Products exported to Firestore");
}
 
export default app;
