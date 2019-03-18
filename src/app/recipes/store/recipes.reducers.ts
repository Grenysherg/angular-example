import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.reducers';
import {Ingredient} from '../../shared/ingredient.model';
import {Recipe} from '../recipe.model';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(0, 'A Test Recipe', 'This is a simply test',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/' +
      'collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [new Ingredient('Ing', 5)])
  ]
};

export function recipesReducer(state = initialState, action: RecipesActions.RecipesActions) {
  switch (action.type) {
    case (RecipesActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };

    case (RecipesActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case (RecipesActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updateRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];

      recipes[action.payload.index] = updateRecipe;

      return {
        ...state,
        recipes: recipes
      };

    case (RecipesActions.DELETE_RECIPE):
      const newRecipes = [...state.recipes];

      newRecipes.splice(action.payload, 1);

      return {
        ...state,
        recipes: newRecipes
      };

    default:
      return state;
  }
}
