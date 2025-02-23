import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ScriptEditorPage from "@/pages/ScriptEditorPage";
import CodeDetailsPage from "@/pages/CodeDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/script-editor",
    element: <ScriptEditorPage />,
  },
  {
    path: "/code-details",
    element: <CodeDetailsPage />,
  },
]);

export default router;
