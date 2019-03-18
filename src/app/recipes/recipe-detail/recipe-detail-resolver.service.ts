import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolver implements Resolve<Recipe> {
  constructor(private recipesService: RecipesService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return route.params['id'];
  }
}
