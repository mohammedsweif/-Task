import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { JobComponent } from './job/job.component';
import { DepartmentComponent } from './department/department.component';
 

 

const routes: Routes = [
  {path:"job",component:JobComponent },
  {path:"department",component:DepartmentComponent },
  {path:"",component:AllBooksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
