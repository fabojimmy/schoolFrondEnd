import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InactivityServiceService } from './inactivity-service.service';
import { NiveauComponent } from './niveau/niveau.component';
import { SpecialiteComponent } from './specialite/specialite.component';
import { FiliereComponent } from './filiere/filiere.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { InscriptionComponent } from './inscription/inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    NiveauComponent,
    SpecialiteComponent,
    FiliereComponent,
    EtablissementComponent,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {positionClass: 'toast-top-center', // Position en haut
      preventDuplicates: true,}
    ),
   
    // ... autres imports
  
  ],
  providers: [
    // InactivityServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
