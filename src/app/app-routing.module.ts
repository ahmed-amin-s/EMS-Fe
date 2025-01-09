import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EmployeeDetailsComponent } from './components/employees/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';
import { AllEmployeesComponent } from './components/employees/all-employees/all-employees.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'employees',
    canActivate: [authGuard],
    component: AllEmployeesComponent,
  },
  {
    path: 'employee-details/:id',
    canActivate: [authGuard],
    component: EmployeeDetailsComponent,
  },
  {
    path: 'add-employee',
    canActivate: [authGuard],
    component: AddEmployeeComponent,
  },
  {
    path: 'update-employee/:id',
    canActivate: [authGuard],
    component: AddEmployeeComponent,
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
