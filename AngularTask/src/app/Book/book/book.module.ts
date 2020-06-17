import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
 
import { AllBooksComponent } from './all-books/all-books.component';
import { DepartmentComponent } from './department/department.component';
import { JobComponent } from './job/job.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [   AllBooksComponent, DepartmentComponent, JobComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
    
  ]
})
export class BookModule { }
