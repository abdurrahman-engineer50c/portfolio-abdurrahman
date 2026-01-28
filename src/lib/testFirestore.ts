import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const testFirestore = async () => {
  try {
    const snap = await getDocs(collection(db, "test"));
    console.log(
      "TEST DATA:",
      snap.docs.map((d) => d.data()),
    );
  } catch (err) {
    console.error("Firestore ERROR:", err);
  }
};
