import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RoompageComponent } from './pages/roompage/roompage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'room/:id', component: RoompageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
