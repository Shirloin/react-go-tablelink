import Layout from "@/components/layouts/layout";
import { createBrowserRouter } from "react-router-dom";
import IngredientManagementPage from "@/presentation/pages/ingredient-page";
import ItemManagementPage from "@/presentation/pages/item-page";
import ItemIngredientPage from "@/presentation/pages/item-ingredient-page";

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
