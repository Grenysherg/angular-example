import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromRecipes from '../store/recipes.reducers';
import * as RecipesActions from '../store/recipes.actions';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipesState: Observable<fromRecipes.State>;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router,
              private store: Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.id = +data['id'];
      this.recipesState = this.store.select('recipes');
    });
  }

  onAddToShoppingList(event: Event) {
    event.preventDefault();

    this.recipesState.pipe(take(1)).subscribe((recipeState: fromRecipes.State) => {
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    });
  }

  onDelete() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
