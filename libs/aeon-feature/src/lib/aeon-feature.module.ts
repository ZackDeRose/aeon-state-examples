import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AeonEffects, reducer } from './aeon.state';
import { EffectsModule } from '@ngrx/effects';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';

export const aeonFeatureRoutes: Route[] = [
  { path: '', component: ListComponent },
  { path: 'add', component: AddComponent },
  { path: 'update/:id', component: UpdateComponent },
  { path: ':id', component: DetailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(aeonFeatureRoutes),
    StoreModule.forFeature('aeons', reducer),
    EffectsModule.forFeature([AeonEffects]),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ListComponent,
    DetailComponent,
    AddComponent,
    FormComponent,
    UpdateComponent,
  ],
})
export class AeonFeatureModule {}
