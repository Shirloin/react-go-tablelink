import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { useDeleteIngredient } from "@/presentation/hooks/use-ingredients";
import type { Ingredient } from "@/core/domain/entities/Ingredient";
import type { ComponentPropsWithRef } from "react";
import { toast } from "sonner";

interface DeleteIngredientProps extends ComponentPropsWithRef<typeof Dialog> {
  ingredient: Ingredient | null;
}

export default function DeleteIngredientModal({
  ingredient,
  ...props
}: DeleteIngredientProps) {
  const { mutate: deleteIngredient } = useDeleteIngredient();
  const handleSubmit = () => {
    if (!ingredient || !ingredient.uuid) return;
    deleteIngredient(ingredient!.uuid!, {
      onSuccess: () => {
        toast.success("Ingredient deleted successfully");
        props.onOpenChange?.(false);
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to delete ingredient");
      },
    });
  };
  return (
    <Dialog {...props}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Ingredient {ingredient?.name}</DialogTitle>
        </DialogHeader>
        <div>
          <p>Are you sure you want to delete this ingredient?</p>
          <Button variant="destructive" onClick={handleSubmit}>
            Yes, delete
          </Button>
          <Button variant="outline" onClick={() => props.onOpenChange?.(false)}>
            No, cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

