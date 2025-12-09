import { useState } from "react";
import { useGetItems } from "@/hooks/use-items";
import { useGetIngredients } from "@/hooks/use-ingredients";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  addItemIngredient,
  removeItemIngredient,
} from "@/api/item-ingredients";
import { getItem } from "@/api/items";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function ItemIngredientPage() {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const queryClient = useQueryClient();

  const { data: itemsData } = useGetItems(0, 1000); // Get all items
  const { data: ingredientsData } = useGetIngredients(0, 1000); // Get all ingredients

  const items = itemsData?.data || [];
  const ingredients = ingredientsData?.data || [];

  const { data: selectedItemData } = useQuery({
    queryKey: ["item", selectedItem],
    queryFn: () => getItem(selectedItem),
    enabled: !!selectedItem,
  });

  const addMutation = useMutation({
    mutationFn: ({
      itemUuid,
      ingredientUuid,
    }: {
      itemUuid: string;
      ingredientUuid: string;
    }) => addItemIngredient(itemUuid, ingredientUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", selectedItem] });
      toast.success("Ingredient added successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add ingredient");
    },
  });

  const removeMutation = useMutation({
    mutationFn: ({
      itemUuid,
      ingredientUuid,
    }: {
      itemUuid: string;
      ingredientUuid: string;
    }) => removeItemIngredient(itemUuid, ingredientUuid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", selectedItem] });
      toast.success("Ingredient removed successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to remove ingredient"
      );
    },
  });

  const handleAddIngredient = (ingredientUuid: string) => {
    if (!selectedItem) return;
    addMutation.mutate({ itemUuid: selectedItem, ingredientUuid });
  };

  const handleRemoveIngredient = (ingredientUuid: string) => {
    if (!selectedItem) return;
    removeMutation.mutate({ itemUuid: selectedItem, ingredientUuid });
  };

  const itemIngredients = selectedItemData?.data?.ingredients || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Item-Ingredient Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Select Item</CardTitle>
          <CardDescription>
            Choose an item to manage its ingredients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={selectedItem} onValueChange={setSelectedItem}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an item" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item: any) => (
                <SelectItem key={item.uuid} value={item.uuid}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedItem && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Current Ingredients</CardTitle>
              <CardDescription>
                Ingredients associated with this item
              </CardDescription>
            </CardHeader>
            <CardContent>
              {itemIngredients.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {itemIngredients.map((ingredient: any) => (
                    <Badge
                      key={ingredient.uuid}
                      variant="secondary"
                      className="text-sm p-2"
                    >
                      {ingredient.name}
                      <button
                        onClick={() => handleRemoveIngredient(ingredient.uuid)}
                        className="ml-2 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No ingredients added yet</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Ingredients</CardTitle>
              <CardDescription>
                Select an ingredient to add to this item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ingredients
                  .filter(
                    (ingredient: any) =>
                      !itemIngredients.some(
                        (ii: any) => ii.uuid === ingredient.uuid
                      )
                  )
                  .map((ingredient: any) => (
                    <Button
                      key={ingredient.uuid}
                      variant="outline"
                      onClick={() => handleAddIngredient(ingredient.uuid)}
                      disabled={addMutation.isPending}
                    >
                      + {ingredient.name}
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
