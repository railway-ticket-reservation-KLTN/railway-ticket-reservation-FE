import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindTicketsComponent } from './viewer/passenger/sidebar/find-tickets/find-tickets.component';
import { RegulationsComponent } from './viewer/passenger/sidebar/regulations/regulations.component';
import { MainComponent } from './viewer/passenger/main/main.component';
import { ResultTicketsComponent } from './viewer/passenger/sidebar/result-tickets/result-tickets.component';
import { CheckTicketsComponent } from './viewer/passenger/sidebar/check-tickets/check-tickets.component';
import { PayTicketsComponent } from './viewer/passenger/sidebar/pay-tickets/pay-tickets.component';
import { AboutUsComponent } from './viewer/passenger/sidebar/about-us/about-us.component';
import { DieukienComponent } from './viewer/passenger/sidebar/regulations/dieukien/dieukien.component';
import { ChinhsachbaomatComponent } from './viewer/passenger/sidebar/regulations/chinhsachbaomat/chinhsachbaomat.component';
import { DieukhoansudungComponent } from './viewer/passenger/sidebar/regulations/dieukhoansudung/dieukhoansudung.component';
import { PhuongthucthanhtoanComponent } from './viewer/passenger/sidebar/regulations/phuongthucthanhtoan/phuongthucthanhtoan.component';
import { ConfirmTicketsComponent } from './viewer/passenger/sidebar/confirm-tickets/confirm-tickets.component';
import { SussecssTicketsComponent } from './viewer/passenger/sidebar/sussecss-tickets/sussecss-tickets.component';
import { ReturnTicketsComponent } from './viewer/passenger/sidebar/return-tickets/return-tickets.component';
import { ConfirmEmailComponent } from './viewer/passenger/sidebar/return-tickets/confirm-email/confirm-email.component';
import { DashboardComponent } from './viewer/admin/dashboard/dashboard.component';
import { HomeComponent } from './viewer/admin/home/home.component';
import { NhanvienComponent } from './viewer/admin/nhanvien/nhanvien.component';
import { VeComponent } from './viewer/admin/ve/ve.component';
import { TauComponent } from './viewer/admin/tau/tau.component';
import { LoginComponent } from './viewer/admin/login/login.component';
import { AdminService } from './service/admin-service.service';
import { MomoComponent } from './viewer/passenger/sidebar/momo/momo.component';

const routes: Routes = [
  { path: '', redirectTo: '/trangchu', pathMatch: 'full' },
  { path: 'trangchu', component: MainComponent },
  { path: 'tim-ve', component: FindTicketsComponent },
  { path: 'regulations', component: RegulationsComponent },
  { path: 'ket-qua', component:ResultTicketsComponent  },
  { path: 'kiem-tra-ve', component:CheckTicketsComponent  },
  { path: 'tra-ve', component:ReturnTicketsComponent },
  { path: 'lien-he', component:AboutUsComponent  },
  { path: 'dieukien', component:DieukienComponent  },
  { path: 'chinhsachbaomat', component:ChinhsachbaomatComponent},
  {path:'dieukhoansudung', component:DieukhoansudungComponent},
  {path:'phuongthucthanhtoan', component:PhuongthucthanhtoanComponent},
  {path:'thanhtoan', component:PayTicketsComponent},
  {path:'xac-nhan-thong-tin-ve', component:ConfirmTicketsComponent},
  {path:'thong-tin-giao-dich', component:SussecssTicketsComponent},
  {path:'xac-nhan-email', component:ConfirmEmailComponent},
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path:'nhan-vien', component:NhanvienComponent},
  {path:'ves', component:VeComponent},
  {path:'taus', component:TauComponent},
  {path:'login', component:LoginComponent},
  {path:'momopayment', component:MomoComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
