import { Routes } from '@angular/router';
import { DialogExampleComponent } from './dialog/dialog-example.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  {
    path: 'dialog',
    component: DialogExampleComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  { path: '**', redirectTo: '' },
];
