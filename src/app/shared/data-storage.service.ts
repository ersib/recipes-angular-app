import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipe-book/recipe.service";
import { Recipe } from "../recipe-book/recipe.model";
import { Meal } from "./meal.model";
import { map, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private recipesService: RecipeService) {}

    url = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood";

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.post(this.url, recipes).subscribe(response => {
            console.log("POST response", response);
        });
    }

    getRecipes() {
        return this.http.get<{  meals: Meal[] }>(this.url)
        .pipe(
            map(mealsResponse => {
                 return mealsResponse.meals.map(meal => {
                    return new Recipe(meal.strMeal, meal.strMeal, meal.strMealThumb, []);
                });
            }),
            tap(recipes => {
                this.recipesService.setRecipes(recipes);
            })
        );
        /*.subscribe(recipes => {
            console.log("GET recipes", recipes);
            this.recipesService.setRecipes(recipes);
        });*/
    }

}

