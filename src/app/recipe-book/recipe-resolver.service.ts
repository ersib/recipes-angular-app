import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveData, ResolveEnd, ResolveFn, ResolveStart, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: "root" })
export class RecipesResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService : DataStorageService, private recipesService : RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipesService.getRecipes();
        //if (recipes.length)
            return this.dataStorageService.getRecipes();
        //else 
           // return recipes;
    }

}