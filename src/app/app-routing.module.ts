import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { RecipeBookComponent } from "./recipe-book/recipe-book.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipe-book/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipe-book/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-book/recipe-edit/recipe-edit.component";
import { RecipesResolverService } from "./recipe-book/recipe-resolver.service";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";




const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/recipes',
        pathMatch: 'full' // redirect only on full path, Without this option, the empty '' is part of any url
    },
    { 
        path: 'recipes', 
        loadChildren: () => import('./recipe-book/recipe-book.module').then(x => x.RecipeBookModule)
    },
    { 
        path: 'shopping-list', 
        loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)
    },
    { 
        path: 'auth', 
        loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}