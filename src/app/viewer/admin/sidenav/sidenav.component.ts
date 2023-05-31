import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private tenService: AdminService,
    private router: Router,
    private location: Location,
  ) {

  }
  ngOnInit(): void {
    this.kiemTraToken();
  }

  kiemTraToken(): void {
    const token = this.tenService.getToken();
    const routePaths = ['/home', '/ves', '/taus', '/nhan-vien', '/thongke'];
    if (routePaths.includes(this.location.path()) && !token) {
      this.router.navigate(['/login']);
    }
  }
}
