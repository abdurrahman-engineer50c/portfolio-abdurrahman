// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);

// main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Pastikan import "./firebase" dilakukan di sini jika App.tsx belum melakukannya
import "./lib/firebase"; 

createRoot(rootElement).render(<App />);