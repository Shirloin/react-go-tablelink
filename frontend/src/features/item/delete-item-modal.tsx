import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteItem } from "@/hooks/use-items";
import { toast } from "sonner";
import type Item from "@/types/item";

interface DeleteItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
}

export default function DeleteItemModal({
  open,
  onOpenChange,
  item,
}: DeleteItemModalProps) {
  const deleteItem = useDeleteItem();

  const handleDelete = async () => {
    if (!item?.uuid) return;
    try {
      await deleteItem.mutateAsync(item.uuid);
      toast.success("Item deleted successfully");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete item");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will soft delete the item "{item?.name}". This action cannot be
            undone, but the item can be recovered if needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteItem.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteItem.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

