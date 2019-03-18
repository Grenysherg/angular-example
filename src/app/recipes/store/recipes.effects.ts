import * as fromRecipes from './recipes.reducers';
import * as RecipeActions from './recipes.actions';

import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';

@Injectable()
export class RecipesEffects {
  @Effect()
  recipesFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>('https://udemy-ng-http-7bf8c.firebaseio.com/recipes.json');
    }),
    map((recipes) => {
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }

      return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
    }));

  @Effect({
    dispatch: false
  })
  recipesStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      const req = new HttpRequest('PUT', 'https://udemy-ng-http-7bf8c.firebaseio.com/recipes.json', state.recipes, {
        reportProgress: true
      });

      return this.httpClient.request(req);
    }));

  constructor(private actions$: Actions, private httpClient: HttpClient,
              private store: Store<fromRecipes.FeatureState>) {
  }
}
