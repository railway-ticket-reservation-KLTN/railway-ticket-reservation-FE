import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './viewer/passenger/home/home.component';
import { FindTicketsComponent } from './viewer/passenger/sidebar/find-tickets/find-tickets.component';
import { PayTicketsComponent } from './viewer/passenger/sidebar/pay-tickets/pay-tickets.component';
import { RegulationsComponent } from './viewer/passenger/sidebar/regulations/regulations.component';
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
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ConfirmEmailComponent } from './viewer/passenger/sidebar/return-tickets/confirm-email/confirm-email.component';
import { DashboardComponent } from './viewer/admin/dashboard/dashboard.component';
import { SidenavComponent } from './viewer/admin/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './viewer/passenger/header/header.component';
import { HeaderComponentAdmin } from './viewer/admin/header/header.component';
import { NhanvienComponent } from './viewer/admin/nhanvien/nhanvien.component';
import { VeComponent } from './viewer/admin/ve/ve.component';
import { TauComponent } from './viewer/admin/tau/tau.component';
import { LoginComponent } from './viewer/admin/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EmpAddEditComponent } from './viewer/admin/emp-add-edit/emp-add-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MomoComponent } from './viewer/passenger/sidebar/momo/momo.component';
import { SussecssReturnComponent } from './viewer/passenger/sidebar/return-tickets/sussecss-return/sussecss-return.component';
import { ChartComponent } from './viewer/admin/chart/chart.component';
import { QuydinhvanchuyenComponent } from './viewer/passenger/sidebar/regulations/dieukien/quydinhvanchuyen/quydinhvanchuyen.component';
import { MuavetructuyenComponent } from './viewer/passenger/sidebar/regulations/dieukien/muavetructuyen/muavetructuyen.component';
import { ChinhsachhoantraveComponent } from './viewer/passenger/sidebar/regulations/chinhsachhoantrave/chinhsachhoantrave.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
    ConfirmEmailComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    HeaderComponentAdmin,
    DashboardComponent,
    SidenavComponent,
    NhanvienComponent,
    VeComponent,
    TauComponent,
    LoginComponent,
    EmpAddEditComponent,
    MomoComponent,
    SussecssReturnComponent,
    ChartComponent,
    QuydinhvanchuyenComponent,
    MuavetructuyenComponent,
    ChinhsachhoantraveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    NgScrollbarModule,
    HttpClientXsrfModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
