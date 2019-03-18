import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipesComponent} from './recipes.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipesRoutingModule} from './recipes-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipesReducer} from './store/recipes.reducers';
import {EffectsModule} from '@ngrx/effects';
import {RecipesEffects} from './store/recipes.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    StoreModule.forFeature('recipes', recipesReducer),
    EffectsModule.forFeature([RecipesEffects])
  ],
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    EditRecipeComponent
  ]
})
export class RecipesModule {
}
