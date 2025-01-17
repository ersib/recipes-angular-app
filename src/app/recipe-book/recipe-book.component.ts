import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrl: './recipe-book.component.css'
  //providers:[RecipeService]
})
export class RecipeBookComponent implements OnInit {
  currentRecipe: Recipe;

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
    /*
    this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.currentRecipe = recipe;
      }
    )*/
  }

  //onCurrentRecipeUpdated(recipe) {
    //this.currentRecipe = recipe;
  //}

}
