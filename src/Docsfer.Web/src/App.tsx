import { RouterProvider } from "react-router";
import { ToastProvider } from "@hooks/useToast";
import { router } from "./router/route";

function App() {
  return (
    <div className="App">
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </div>
  );
}

export default App;
