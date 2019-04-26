import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { NetiaComponent } from './dashboard/netia/netia.component';
import { OrangeComponent } from './dashboard/orange/orange.component';
import { UpcComponent } from './dashboard/upc/upc.component';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { WorkordersListComponent } from './workorders/workorders-list/workorders-list.component';
import { ActivationsListComponent } from './workorders/activations-list/activations-list.component';
import { WorkorderComponent } from './workorders/workorder/workorder.component';
import { MemoriesListComponent } from './workorders/memories-list/memories-list.component';
import { SallaryComponent } from './workorders/sallary/sallary.component';
import { SettingsComponent } from './workorders/settings/settings.component';
import { CalendarViewComponent } from './workorders/calendar-view/calendar-view.component';
import { VindicationsComponent } from './workorders/vindications/vindications.component';



const routes: Routes = [
  { path: '', component: HomePageComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'notes', component: NotesListComponent,  canActivate: [AuthGuard] },
  { path: 'memories', component: MemoriesListComponent,  canActivate: [AuthGuard] },
  { path: 'activations', component: ActivationsListComponent,  canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent,  canActivate: [AuthGuard] },
  { path: 'netia/calendar', component: CalendarViewComponent,  canActivate: [AuthGuard] },
  { path: 'vindications', component: VindicationsComponent,  canActivate: [AuthGuard] },
  { path: 'sallary', component: SallaryComponent,  canActivate: [AuthGuard] },
  { path: ':company/workorder/:wo_id', component: WorkorderComponent,  canActivate: [AuthGuard] },
  { path: 'upc/center', component: UpcComponent,  canActivate: [AuthGuard] },
  { path: 'netia/center', component: NetiaComponent,  canActivate: [AuthGuard] },
  { path: 'orange/center', component: OrangeComponent,  canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
