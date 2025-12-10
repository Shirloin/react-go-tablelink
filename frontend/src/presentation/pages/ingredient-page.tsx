import IngredientTable from "@/presentation/components/features/ingredient/ingredient-table";

export default function IngredientManagementPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ingredient Management</h1>
      <IngredientTable />
    </div>
  );
}
