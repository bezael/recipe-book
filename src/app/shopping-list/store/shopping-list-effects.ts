import { Ingredient } from './../../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import * as ShoppingListActions from './shopping-list.actions';

import * as fromShoppingList from '../store/shopping-list.reducers';

@Injectable()
export class ShoppingListEffects {
  @Effect({ dispatch: false })
  ingredientStore = this.actions$
    .ofType(ShoppingListActions.ADD_INGREDIENT)
    .pipe(
      switchMap((action: ShoppingListActions.AddIngredient)  => {
        const currentUserId = firebase.auth().currentUser.uid;
        const db = firebase.database().ref();
        const id = db.child(`shopping_lists/${currentUserId}`).push().key;
        action.payload.id = id;
        const updates = {};

        updates[`/shopping_lists/${currentUserId}/${id}`] = {
          ...action.payload,
          id
        };

        return firebase
          .database()
          .ref()
          .update(updates);
      })
    );

  @Effect()
  ingredientFetch = this.actions$
    .ofType(ShoppingListActions.FETCH_SHOPPING_LIST)
    .pipe(
      switchMap((action: ShoppingListActions.FetchShoppingList) => {
        const currentUserId = firebase.auth().currentUser.uid;
        return firebase
          .database()
          .ref('shopping_lists/' + currentUserId)
          .once('value');
      }),
      map(ingredients => {
        const shoppingList = ingredients.val() ? Object.values(ingredients.val()) : [];
        return {
          type: ShoppingListActions.SET_SHOPPING_LIST,
          payload: shoppingList
        };
      })
    );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromShoppingList.State>
  ) {}
}
