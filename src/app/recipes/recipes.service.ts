import {Injectable, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(0, 'A Test Recipe', 'This is a simply test',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/' +
      'collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [new Ingredient('Ing', 5)])
  ];
  private lastIndex = this.recipes.length;
  recipesChanged = new Subject<Recipe[]>();

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.lastIndex = this.recipes.length;
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {

    this.recipes.push(new Recipe(this.lastIndex, name, desc, imagePath, ingredients));
    this.lastIndex++;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index, name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    const arrayIndex = this.recipes.indexOf(this.recipes.find(element => element.id === index));
    this.recipes[arrayIndex] = new Recipe(index, name, desc, imagePath, ingredients);
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes.find((value) => value.id === id);
  }

  delete(recipe: Recipe) {
    const arrayIndex = this.recipes.indexOf(recipe);

    this.recipes.splice(arrayIndex, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
