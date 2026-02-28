import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { inject } from '@vercel/analytics'; // Tambahkan ini

inject(); // Panggil fungsi ini

createRoot(document.getElementById("root")!).render(<App />);
