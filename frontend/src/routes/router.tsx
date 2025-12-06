import Layout from "@/layouts/layout";
import { createBrowserRouter } from "react-router-dom";
import IngredientManagementPage from "@/pages/ingredient-page";
import ItemManagementPage from "@/pages/item-page";
import ItemIngredientPage from "@/pages/item-ingredient-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <IngredientManagementPage />,
      },
      {
        path: "/item",
        element: <ItemManagementPage />,
      },
      {
        path: "item-ingredient",
        element: <ItemIngredientPage />,
      },
    ],
  },
]);

export default router;
