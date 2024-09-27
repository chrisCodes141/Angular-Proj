import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandingNavComponent } from './landing-nav/landing-nav.component';
import { LoginComponent } from './landing-nav/login/login.component';
import { RegisterComponent } from './landing-nav/register/register.component';
import { ForgotpwComponent } from './landing-nav/forgotpw/forgotpw.component';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { FoodlistComponent } from './home-nav/foodlist/foodlist.component';
import { CartComponent } from './home-nav/cart/cart.component';
import { ProfileComponent } from './home-nav/profile/profile.component';
import { SettingsComponent } from './home-nav/settings/settings.component';
import { TrackComponent } from './home-nav/cart/track/track.component'; // changing this from './home-nav/track/track.component';
import { SearchBarComponent } from './home-nav/foodlist/search-bar/search-bar.component';
import { CardlistComponent } from './home-nav/settings/cardlist/cardlist.component';
import { AddresslistComponent } from './home-nav/settings/addresslist/addresslist.component';
import { AddressCardComponent } from './home-nav/settings/addresslist/address-card/address-card.component';
import { PayCardComponent } from './home-nav/settings/cardlist/pay-card/pay-card.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helpers';
//import { WildSearchPipe } from './CustomPipes/wild-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingNavComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpwComponent,
    HomeNavComponent,
    FoodlistComponent,
    CartComponent,
    ProfileComponent,
    SettingsComponent,
    TrackComponent,
    SearchBarComponent,
    CardlistComponent,
    AddresslistComponent,
    AddressCardComponent,
    PayCardComponent,
    AlertsComponent,
  //  WildSearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
