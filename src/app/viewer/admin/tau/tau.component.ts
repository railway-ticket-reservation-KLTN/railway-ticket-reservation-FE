import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OtherAdminService } from 'src/app/service/other-admin-service';

@Component({
  selector: 'app-tau',
  templateUrl: './tau.component.html',
  styleUrls: ['./tau.component.css']
})
export class TauComponent implements OnInit {
  HanhTrinh:any[];
  constructor(
    private _dialog: MatDialog,
    private service:OtherAdminService,
  ) {}
  ngOnInit() {
    this.service.getDanhSachHanhTrinh().subscribe(data =>{
      console.log(data);
      this.HanhTrinh=data;
      
    })
  }
}
