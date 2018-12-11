import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: '', loadChildren: './portal/portal.module#PortalPageModule' },
  { path: 'app', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'sound', loadChildren: './sound/sound.module#SoundPageModule' },
  { path: 'movement', loadChildren: './movement/movement.module#MovementPageModule' },
  { path: 'light', loadChildren: './light/light.module#LightPageModule' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
