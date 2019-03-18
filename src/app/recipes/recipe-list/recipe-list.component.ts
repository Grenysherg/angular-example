import {Component, OnInit} from '@angular/core';
import * as fromRecipes from '../store/recipes.reducers';

import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<fromRecipes.State>;
  subscription: Subscription;

  constructor(private store: Store<fromRecipes.FeatureState>) {
  }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }
}
