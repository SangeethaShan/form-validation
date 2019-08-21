import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
/* import { GooglePlacesComponent } from './google-places/google-places.component'; */

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    EmployeeFormComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
