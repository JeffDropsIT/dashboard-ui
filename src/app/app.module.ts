import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import {BlockUIModule} from 'ng-block-ui';
import { LoginComponent } from './components/login/login.component';
import {RequestInterceptor} from "./core/services/interceptor/interceptor";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BlockUIModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
