import { Routes } from '@angular/router';
import { DialogExampleComponent } from './dialog/dialog-example.component';
import { HomeComponent } from './home/home.component';
import { FormsExampleComponent } from './forms/forms-example.component';
import { PopupExampleComponent } from './popup/popup-example.component';

export const appRoutes: Routes = [
  {
    path: 'dialog',
    component: DialogExampleComponent,
  },
  {
    path: 'forms',
    component: FormsExampleComponent,
  },
  {
    path: 'popup',
    component: PopupExampleComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  { path: '**', redirectTo: '' },
];
