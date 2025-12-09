package item_ingredient

type AddItemIngredientRequest struct {
	UuidItem       string
	UuidIngredient string
}

type AddItemIngredientResponse struct {
	Success bool
	Message string
}

type DeleteItemIngredientRequest struct {
	UuidItem       string
	UuidIngredient string
}

type DeleteItemIngredientResponse struct {
	Success bool
	Message string
}

type GetItemIngredientsRequest struct {
	UuidItem string
}

type ItemIngredient struct {
	UuidItem       string
	UuidIngredient string
}

type GetItemIngredientsResponse struct {
	Success         bool
	Message         string
	ItemIngredients []*ItemIngredient
}
