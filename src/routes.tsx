import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import ScriptEditorPage from "@/pages/ScriptEditorPage";
import CodeDetailsPage from "@/pages/CodeDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
    ],
  },
]);

export default router;
