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
selectedLoads:any[]=[];
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
  selectLoad(event: any, load: any) {
    load.isSelected = event.target.checked;
    
    if (load.isSelected) {
      this.selectedLoads.push(load);   
    } else {
      const index = this.selectedLoads.indexOf(load);
      if (index > -1) {
        this.selectedLoads.splice(index, 1);
      }
    }
    console.log(this.selectedLoads);
  }

  btnDatVe(){
    alert("Đặt vé")
  }
  btnTraVe(){
    alert("Trả vé")
  }
}
