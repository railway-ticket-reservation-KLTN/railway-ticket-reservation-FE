import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(
    private tenService: AdminService, 
    private router: Router
  ){

  }
  ngOnInit(): void {
    this.kiemTraToken();
  }

  kiemTraToken(): void {
    const token = this.tenService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
    }
  }
}
