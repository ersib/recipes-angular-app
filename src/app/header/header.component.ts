import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { SECTION_TYPE } from "../shared/section-type.model";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService, private authService : AuthService) {}


    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        })
    }

    SECTION_TYPE = SECTION_TYPE;

    collapsed = true;

    @Output() sectionSelected = new EventEmitter();

    onSaveDate(){
        this.dataStorageService.storeRecipes();
    }

    onGetDate(){
        this.dataStorageService.getRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    /*onSelectedSection(sectionType) {
        this.sectionSelected.emit(sectionType);
    }*/

     ngOnDestroy() {
        this.userSub = this.authService.user.subscribe()
     }


}