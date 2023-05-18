import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HoanTatThanhToanRequest } from 'src/app/domain/HoanTatThanhToanRequest';
import { XacNhanThongTinVeInfo } from 'src/app/domain/XacNhanThongTinVeInfo';
import { MachineService } from 'src/app/service/machine-service.service';

@Component({
  selector: 'app-momo',
  templateUrl: './momo.component.html',
  styleUrls: ['./momo.component.css']
})
export class MomoComponent implements OnInit {

  thanhToanInFo: any;
  xacnhanthongtinveInfo = new XacNhanThongTinVeInfo;
  hoanTatThanhToanRequest = new HoanTatThanhToanRequest;

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private machineService: MachineService

  ){}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {    
      this.thanhToanInFo = params
      console.log(this.thanhToanInFo)
      
      this.hoanTatThanhToanRequest = {
        orderId:this.thanhToanInFo.orderId,
        resultCode:this.thanhToanInFo.resultCode
      }

      this.machineService.hoanTatThanhToan(this.hoanTatThanhToanRequest).subscribe(data => {
        this.xacnhanthongtinveInfo = data
        console.log(this.xacnhanthongtinveInfo)
        console.log(data)
        this.router.navigate(['/thong-tin-giao-dich'], { queryParams: { data: JSON.stringify(this.xacnhanthongtinveInfo) } });

      })
    })
  }
}
