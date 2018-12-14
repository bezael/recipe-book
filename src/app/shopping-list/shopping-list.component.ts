import { Ingredient } from './../shared/ingredient.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;
  subscription: Subscription;
  dataSource: Ingredient[];
  displayedColumns: string[] = ['select', 'name', 'amount'];
  selection = new SelectionModel<Ingredient>(true, []);
  isLoaded = false;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new ShoppingListActions.FetchShoppingList());

    this.subscription = this.store.select('shoppingList').subscribe(( data ) => {
      if (data.ingredients) {
        this.isLoaded = true;
        this.dataSource = data.ingredients;
      }
    });
    // this.shoppingListState.subscribe(( data ) => {
    //   if (data.ingredients) {
    //     this.isLoaded = true;
    //     this.dataSource = data.ingredients;
    //   }
    // });
  }

  ngOnDestroy() {
    this.isLoaded = false;
    this.dataSource = null;
    this.subscription.unsubscribe();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    console.log(this.selection);
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.forEach(row => this.selection.select(row));
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  onClearSelected() {
    const idsToDelete = this.selection.selected.map((el) => el.id);
    this.store.dispatch(new ShoppingListActions.DeleteIngredients(idsToDelete));
  }
}
