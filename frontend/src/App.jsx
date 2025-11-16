import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
