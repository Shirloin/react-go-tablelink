import { useState } from "react";
import { useGetItems } from "@/presentation/hooks/use-items";
import { useGetIngredients } from "@/presentation/hooks/use-ingredients";
import {
  useGetItemIngredients,
  useAddItemIngredient,
  useRemoveItemIngredient,
} from "@/presentation/hooks/use-item-ingredients";
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
import type { Ingredient } from "@/core/domain/entities/Ingredient";
import type { Item } from "@/core/domain/entities/Item";
import type { ItemIngredient } from "@/core/domain/entities/ItemIngredient";

export default function ItemIngredientPage() {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const { data: itemsData } = useGetItems(0, 10); // Get all items
  const { data: ingredientsData } = useGetIngredients(0, 1000); // Get all ingredients

  const items = itemsData?.data || [];
  const ingredients = ingredientsData?.data || [];

  // Get item ingredients using gRPC
  const { data: itemIngredientsList = [] } = useGetItemIngredients(
    selectedItem,
    !!selectedItem
  );

  const addMutation = useAddItemIngredient();
  const removeMutation = useRemoveItemIngredient();

  const handleAddIngredient = (ingredientUuid: string) => {
    if (!selectedItem) return;
    addMutation.mutate(
      { itemUuid: selectedItem, ingredientUuid },
      {
        onSuccess: () => {
          toast.success("Ingredient added successfully");
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to add ingredient");
        },
      }
    );
  };

  const handleRemoveIngredient = (ingredientUuid: string) => {
    if (!selectedItem) return;
    removeMutation.mutate(
      {
        itemUuid: selectedItem,
        ingredientUuid,
      },
      {
        onSuccess: () => {
          toast.success("Ingredient removed successfully");
        },
        onError: (error) => {
          toast.error(error?.message || "Failed to remove ingredient");
        },
      }
    );
  };

  // Map item ingredients to include full ingredient details for display
  const itemIngredients: ItemIngredient[] = itemIngredientsList.map(
    (ii: ItemIngredient) => {
      const ingredient = ingredients.find(
        (ing: Ingredient) => ing.uuid === ii.uuid_ingredient
      );
      return {
        uuid_ingredient: ii.uuid_ingredient,
        ingredient: ingredient || undefined,
      };
    }
  );

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
              {items.map((item: Item) => (
                <SelectItem key={item.uuid} value={item.uuid || ""}>
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
                  {itemIngredients.map((ingredient: ItemIngredient) => (
                    <Badge
                      key={ingredient.uuid_ingredient}
                      variant="secondary"
                      className="text-sm p-2"
                    >
                      {ingredient.ingredient?.name}
                      <button
                        onClick={() =>
                          handleRemoveIngredient(
                            ingredient.uuid_ingredient || ""
                          )
                        }
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
                    (ingredient: Ingredient) =>
                      !itemIngredients.some(
                        (ii: ItemIngredient) =>
                          ii.uuid_ingredient === ingredient.uuid
                      )
                  )
                  .map((ingredient: Ingredient) => (
                    <Button
                      key={ingredient.uuid}
                      variant="outline"
                      onClick={() => handleAddIngredient(ingredient.uuid || "")}
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
