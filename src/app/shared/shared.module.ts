import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { DropdowDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdowDirective
    ],
    imports: [
        CommonModule // responsible for ngFor and ngIf
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdowDirective,
        CommonModule
    ]
})
export class SharedModule {

}