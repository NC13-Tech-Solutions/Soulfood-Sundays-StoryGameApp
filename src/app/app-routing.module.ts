import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainStoryComponent } from './main-story/main-story.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'main'},
  {path:'main', component: MainStoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
