import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Auth/auth/register/register.component';
import { DepartmentComponent } from './Book/book/department/department.component';
import { JobComponent } from './Book/book/job/job.component';
 


const routes: Routes = [{ path:"Auth", loadChildren: () => import('./Auth/auth/auth.module').then(m => m.AuthModule) },
 { path: 'Book', loadChildren: () => import('./Book/book/book.module').then(m => m.BookModule)  },
 { path:"", loadChildren: () => import('./Auth/auth/auth.module').then(m => m.AuthModule) },
{path:"register",component:RegisterComponent},
{path:"departments",component:DepartmentComponent},
{path:"jobs",component:JobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
