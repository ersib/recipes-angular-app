import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { SECTION_TYPE } from './shared/section-type.model';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'course-project';
  SECTION_TYPE = SECTION_TYPE;
  selectedSection = SECTION_TYPE.RECIPES;
  userName = signal<string>(null);
  userNameSub: Subscription = null;

  constructor(private authService: AuthService, private loggingService: LoggingService) {
    effect(() => console.log("Effect username", this.userName()));
  }

  ngOnInit() {
    this.authService.autoLogin();
    this.userNameSub = this.authService.user.subscribe(user => {
      this.userName.set(user ? user.email : null);
      console.log("username", this.userName);
    })
    this.loggingService.printLog("Hello from AppComponent ngOnInit");
  }

  onNavigate(msg: string, selection) {
    this.selectedSection = selection;
  }

  ngOnDestroy(): void {
    this.userNameSub.unsubscribe();
  }

}
