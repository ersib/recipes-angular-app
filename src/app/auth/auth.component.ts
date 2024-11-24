import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, { static: false}) alertHost: PlaceholderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService,  private router: Router, private compFactoryResolver: ComponentFactoryResolver) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(errorMessage: string) {
        console.log("errorMessage", errorMessage);
        this.error = errorMessage;
        const alertComponentFactory = this.compFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContRef = this.alertHost.viewContRef;
        hostViewContRef.clear();
        const alertComp = hostViewContRef.createComponent(alertComponentFactory);
        alertComp.instance.message = errorMessage;
        this.closeSub = alertComp.instance.close.subscribe(()=>{
            this.closeSub.unsubscribe();
            hostViewContRef.clear();
        })
    }

    onSubmit(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        console.log(form.value);

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if(this.isLoginMode) {
            authObs = this.authService.signin(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        }


        authObs.subscribe(
            resData => {
                console.log("resData", resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, 
            errorMessage => {
                this.showErrorAlert(errorMessage)
                this.isLoading = false;
            }
        )
       
        form.reset();
    }

    ngOnDestroy(): void {
        if (this.closeSub) 
            this.closeSub.unsubscribe();
    }

}