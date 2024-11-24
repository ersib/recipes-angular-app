import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output('recipeSelected') recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  recipesChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {}



  ngOnInit(): void {

    this.recipes = this.recipeService.getRecipes();
   
    //this.recipeSelected.emit(this.recipes[0]);   
   
    this.recipesChangedSubscription = this.recipeService.recipesChanged.subscribe( (changedRecipes: Recipe[]) => {
      this.recipes = changedRecipes;
    });
    
  }

  onNewRecipe() {
    this.router.navigate(['new'], {
      relativeTo: this.route
    })
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }

  //onRecipeSelected(recipe) {
    //this.recipeSelected.emit(recipe);
 // }

}
