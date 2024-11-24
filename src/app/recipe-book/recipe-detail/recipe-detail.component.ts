import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  //@Input('recipe') recipeDetails: Recipe;
  recipeDetails: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router){}

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDetails = this.recipeService.getRecipe(this.id);
      }
    )
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // alternative
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onAddToShoppingList() {
    this.recipeService.addIngreditentsToShoopingList(this.recipeDetails.ingredients);
  }

}
