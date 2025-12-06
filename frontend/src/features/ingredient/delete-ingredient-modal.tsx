import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { useDeleteIngredient } from "@/hooks/use-ingredients";
import type Ingredient from "@/types/ingredient";
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
        props.onOpenChange?.(false);
      },
      onError: () => {
        toast.error("Failed to delete ingredient");
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
