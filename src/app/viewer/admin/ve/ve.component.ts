import { Component, OnInit } from '@angular/core';
import { OtherAdminService } from 'src/app/service/other-admin-service';

@Component({
  selector: 'app-ve',
  templateUrl: './ve.component.html',
  styleUrls: ['./ve.component.css']
})
export class VeComponent implements OnInit {

  constructor(
    private service:OtherAdminService
  ){

  }
  ngOnInit() {
   this.service.getDanhSachVe().subscribe(data =>{
    console.log(data);
    
   })
  }
}
