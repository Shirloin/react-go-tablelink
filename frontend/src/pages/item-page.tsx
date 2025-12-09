import ItemTable from "@/features/item/item-table";

export default function ItemManagementPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Item Management</h1>
      <ItemTable />
    </div>
  );
}
