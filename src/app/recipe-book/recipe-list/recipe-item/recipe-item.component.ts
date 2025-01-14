import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
 
  @Input('recipe') recipe: Recipe;
  @Input() index: number;

  constructor(private recipeService: RecipeService){}

  onSelected() {
    this.recipeService.recipeSelected.next(this.recipe);
  }
}
