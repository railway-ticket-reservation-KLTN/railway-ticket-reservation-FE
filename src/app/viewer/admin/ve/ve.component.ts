import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OtherAdminService } from 'src/app/service/other-admin-service';

@Component({
  selector: 'app-ve',
  templateUrl: './ve.component.html',
  styleUrls: ['./ve.component.css']
})
export class VeComponent implements OnInit {
Ve:any[];
  constructor(
    private service:OtherAdminService,
    private _dialog: MatDialog,
  ){

  }
  ngOnInit() {
   this.service.getDanhSachVe().subscribe(data =>{
    console.log(data);
    this.Ve=data;
    
   })
  }
}
