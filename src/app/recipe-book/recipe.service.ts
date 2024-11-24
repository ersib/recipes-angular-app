import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipeSelected = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();


    recipes: Recipe[] = [
        new Recipe("Test recipe", "Test description", 
            "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg", 
            [
                new Ingredient("Meat", 1),
                new Ingredient('French fries', 15)
            ]),
        new Recipe("Test recipe 2", "Test description 2", "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg", []),
        new Recipe("Test recipe 3", "Test description 3", "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg", [])
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    setRecipes(newRecipes: Recipe[]){
        this.recipes = newRecipes.slice();
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngreditentsToShoopingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(recipeIndex: number, newRecipe: Recipe) {
        this.recipes[recipeIndex] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(recipeIndex: number) {
        this.recipes.splice(recipeIndex, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}