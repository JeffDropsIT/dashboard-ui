import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthenticationGuard} from './components/dashboard/authentication.guard';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  { path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: 'login',
    component: LoginComponent
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
