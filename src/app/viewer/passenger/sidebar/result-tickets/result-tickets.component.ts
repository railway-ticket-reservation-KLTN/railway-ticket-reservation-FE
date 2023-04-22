import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimChuyenTauRequest } from 'src/app/domain/TimChuyenTauRequest';

@Component({
  selector: 'app-result-tickets',
  templateUrl: './result-tickets.component.html',
  styleUrls: ['./result-tickets.component.css']
})
export class ResultTicketsComponent implements OnInit {
  searchTerm:string;
  tauList: any[];
  tauListSearch: any[];
  hanhTrinhInfo: any;
  toaXeList: any[];
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
  
    this.route.queryParams.subscribe(params => {
      const dataSearch = JSON.parse(params['data']);
      console.log(dataSearch);
      this.hanhTrinhInfo=dataSearch[0].hanhTrinh; 
      // console.log(this.hanhTrinhInfo);
      
      this.tauList=dataSearch[0].taus; 
      // console.log(this.tauList);
      
      this.toaXeList=dataSearch[0].toaTaus;
      // console.log(this.toaXeList);
      
      
          
    });
  }

}
