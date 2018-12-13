import { Component, OnInit } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromApp from '../../store/app.reducers';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  signInFormOpened: boolean;
  signUpFormOpened: boolean;
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  toggleSignInForm() {
    this.signInFormOpened = !this.signInFormOpened;
  }
  toggleSignUpForm() {
    this.signUpFormOpened = !this.signUpFormOpened;
  }

}
