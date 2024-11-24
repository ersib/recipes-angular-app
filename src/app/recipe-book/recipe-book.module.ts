import { NgModule } from "@angular/core";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { AppRoutingModule } from "../app-routing.module";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdowDirective } from "../shared/dropdown.directive";
import { SortPipe } from "../pipes/sort.pipe";
import { RecipeBookRoutingModule } from "./recipe-book-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipeBookComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        SortPipe
    ],
    exports: [
        SortPipe
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        RecipeBookRoutingModule,
        SharedModule
    ]
})
export class RecipeBookModule {

}