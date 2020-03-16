import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './employees/list/list.component';
import { AddemployeeComponent } from './employees/addemployee/addemployee.component';


const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'addemployee', component: AddemployeeComponent },
  { path: 'addemployee/:id', component: AddemployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
