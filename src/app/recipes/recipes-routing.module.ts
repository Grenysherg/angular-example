import { NgModule } from '@angular/core';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {EditRecipeComponent} from './edit-recipe/edit-recipe.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {RecipeDetailResolver} from './recipe-detail/recipe-detail-resolver.service';
import {AuthGuard} from '../auth/auth-guard.service';

const recipesRouters: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: EditRecipeComponent, canActivate: [AuthGuard]},
      {path: ':id', component: RecipeDetailComponent, resolve: {id: RecipeDetailResolver}},
      {path: ':id/edit', component: EditRecipeComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRouters)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard]
})
export class RecipesRoutingModule { }
