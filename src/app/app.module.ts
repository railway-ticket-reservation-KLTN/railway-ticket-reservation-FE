import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './viewer/passenger/home/home.component';
import { FindTicketsComponent } from './viewer/passenger/sidebar/find-tickets/find-tickets.component';
import { PayTicketsComponent } from './viewer/passenger/sidebar/pay-tickets/pay-tickets.component';
import { RegulationsComponent } from './viewer/passenger/sidebar/regulations/regulations.component';
import { HeaderComponent } from './viewer/passenger/header/header.component';
import { NotificationsComponent } from './viewer/passenger/notifications/notifications.component';
import { FooterComponent } from './viewer/passenger/footer/footer.component';
import { MainComponent } from './viewer/passenger/main/main.component';
import { ResultTicketsComponent } from './viewer/passenger/sidebar/result-tickets/result-tickets.component';
import { AboutUsComponent } from './viewer/passenger/sidebar/about-us/about-us.component';
import { HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import { DieukienComponent } from './viewer/passenger/sidebar/regulations/dieukien/dieukien.component';
import { ChinhsachbaomatComponent } from './viewer/passenger/sidebar/regulations/chinhsachbaomat/chinhsachbaomat.component';
import { DieukhoansudungComponent } from './viewer/passenger/sidebar/regulations/dieukhoansudung/dieukhoansudung.component';
import { CheckTicketsComponent } from './viewer/passenger/sidebar/check-tickets/check-tickets.component';
import { DialogErrorComponent } from './dialog/dialog-error/dialog-error.component';
import { PhuongthucthanhtoanComponent } from './viewer/passenger/sidebar/regulations/phuongthucthanhtoan/phuongthucthanhtoan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ConfirmTicketsComponent } from './viewer/passenger/sidebar/confirm-tickets/confirm-tickets.component';
import { SussecssTicketsComponent } from './viewer/passenger/sidebar/sussecss-tickets/sussecss-tickets.component';
import { ReturnTicketsComponent } from './viewer/passenger/sidebar/return-tickets/return-tickets.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FindTicketsComponent,
    PayTicketsComponent,
    RegulationsComponent,
    HeaderComponent,
    NotificationsComponent,
    FooterComponent,
    MainComponent,
    ResultTicketsComponent,
    AboutUsComponent,
    DieukienComponent,
    ChinhsachbaomatComponent,
    DieukhoansudungComponent,
    CheckTicketsComponent,
    DialogErrorComponent,
    PhuongthucthanhtoanComponent,
    ConfirmTicketsComponent,
    SussecssTicketsComponent,
    ReturnTicketsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgScrollbarModule,
    HttpClientXsrfModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
