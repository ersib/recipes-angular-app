import { NgModule } from "@angular/core";
import { RecipeService } from "./recipe-book/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { LoggingService } from "./logging.service";

@NgModule({
    providers:[
        ShoppingListService, 
        RecipeService, 
        { 
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService, 
            multi: true
        }
    ]
})
export class CoreModule {

}