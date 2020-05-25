import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TextAdventureComponent } from './text-adventure/text-adventure.component';


const routes: Routes = [
  { path: '**', redirectTo: '/'},
  { path: '', component: TextAdventureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
