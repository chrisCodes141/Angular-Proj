import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './landing-nav/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './landing-nav/login/login.component';
import { FoodlistComponent } from './home-nav/foodlist/foodlist.component';
import { CartComponent } from './home-nav/cart/cart.component';
import { TrackComponent } from './home-nav/cart/track/track.component'; //changing this from './home-nav/track/track.component';
import { SettingsComponent } from './home-nav/settings/settings.component';
import { ProfileComponent } from './home-nav/profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { CardlistComponent } from './home-nav/settings/cardlist/cardlist.component';
import { AddresslistComponent } from './home-nav/settings/addresslist/addresslist.component';
import { ForgotpwComponent } from './landing-nav/forgotpw/forgotpw.component';

const routes: Routes = [
  {path:'', component: LoginComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotpwComponent},
  {
    path: 'home', component: HomeNavComponent, canActivate: [AuthGuard],
    children: [ //home/___
      {path:'food', component: FoodlistComponent, canActivate: [AuthGuard]},
      {path:'cart', component: CartComponent, canActivate: [AuthGuard]},
      {path:'track', component: TrackComponent, canActivate: [AuthGuard]},
      {path:'settings', component: SettingsComponent, canActivate: [AuthGuard]},
      {path:'card', component: CardlistComponent, canActivate: [AuthGuard]},
      {path:'address', component: AddresslistComponent, canActivate: [AuthGuard]},
      {path:'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    ]
  },
  {path: '**', redirectTo: ''} //default
]


@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
