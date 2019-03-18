import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRecipes from '../../recipes/store/recipes.reducers';
import * as RecipesActions from '../../recipes/store/recipes.actions';
import * as fromAuth from '../../auth/store/auth.reducer';
import {Observable} from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromRecipes.FeatureState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}

