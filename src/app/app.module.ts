import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdowDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipe-book/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { RecipeService } from './recipe-book/recipe.service';
import { ReversePipe } from './pipes/reverse.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipeBookModule } from './recipe-book/recipe-book.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe,
    //SortPipe,
    HeaderComponent,
    //DropdowDirective,
    //AuthComponent,
    //LoadingSpinnerComponent,
    //AlertComponent,
    //PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    //FormsModule,
    AppRoutingModule,
    //ReactiveFormsModule,
    HttpClientModule,

    //RecipeBookModule, // commented because it will be loaded using lazy loading
    //ShoppingListModule, // commented because it will be loaded using lazy loading
    SharedModule,
    CoreModule,
    //AuthModule // commented because it will be loaded using lazy loading
  ],
  //providers: [
    //ShoppingListService, 
    //RecipeService, 
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  //],
  bootstrap: [AppComponent]
})
export class AppModule { }
