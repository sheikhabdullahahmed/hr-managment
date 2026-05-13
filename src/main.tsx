// main.tsx
import ReactDOM from "react-dom/client";
import App from "./pages/dashbaord";
import "./index.css";
import { ThemeProvider } from "./Components/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);