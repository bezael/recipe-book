import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAuth from './auth/store/auth.reducers';
import * as fromApp from './store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDMAqEAGjp4bwiFjJQrPhy3bXn4inGAKCE',
      authDomain: 'ng-recipe-book-dfe7d.firebaseapp.com'
    });

    this.authState = this.store.select('auth');
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
