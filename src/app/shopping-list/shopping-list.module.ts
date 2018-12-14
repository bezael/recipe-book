import { ShoppingListEffects } from './store/shopping-list-effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    EffectsModule.forFeature([ShoppingListEffects])
  ]
})
export class ShoppingListModule {}
