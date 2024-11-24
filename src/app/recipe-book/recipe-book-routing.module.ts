import { NgModule } from "@angular/core";
import { RecipeBookComponent } from "./recipe-book.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipe-resolver.service";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { Route, RouterModule, Routes } from "@angular/router";

const recipesRoute: Routes = [{
    path: '',
    //path: 'recipes',
    component: RecipeBookComponent,
    canActivate: [AuthGuard],
    children: [{
            path: '', 
            component: RecipeStartComponent
        }, {
            path: 'new',
            component: RecipeEditComponent,
            resolve: [RecipesResolverService]
        }, {
            path: ':id',
            component: RecipeDetailComponent,
            resolve: [RecipesResolverService]
        }, {
            path: ':id/edit',
            component: RecipeEditComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(recipesRoute)],
    exports: [RouterModule]
})
export class RecipeBookRoutingModule {

}