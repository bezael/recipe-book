import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'A Test',
      'This is simply a test',
      'https://images.pexels.com/photos/69817/france-confectionery-raspberry-cake-fruit-69817.jpeg?auto=compress&cs=tinysrgb&h=350',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'A Test',
      'This is simply a test',
      'https://images.pexels.com/photos/69817/france-confectionery-raspberry-cake-fruit-69817.jpeg?auto=compress&cs=tinysrgb&h=350',
      [
        new Ingredient('Buns', 1),
        new Ingredient('Meat', 20)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes);
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
