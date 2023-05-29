import { Component } from '@angular/core';
import { Chart, ChartOptions, LinearScale } from 'chart.js';
import 'chart.js/auto';
import { OtherAdminService } from 'src/app/service/other-admin-service';
@Component({
  selector: 'app-home-two',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  chart: Chart;
  veTrongThang:any;
  doanhThuTrongThang:any;
  doanhThuThangTheoNam:any[]=[];
  formattedDoanhThu:any;
  thang:any[]=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  dataSetChart:any[]=[];

  ngOnInit() {
    this.renderChart();
    this.service.getDanhSachVeTrongThang().subscribe(data =>{
      this.veTrongThang= data;
      console.log(this.veTrongThang);
      
    });
    this.service.getDoanhThuTrongThang().subscribe(data =>{
      this.doanhThuTrongThang=data;
      this.formattedDoanhThu = this.doanhThuTrongThang.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

      
    });
    this.service.getDoanhThuTrongNam().subscribe(data =>{
      this.doanhThuThangTheoNam=data;
      console.log(this.doanhThuThangTheoNam); 
      if (this.doanhThuThangTheoNam) {
        this.thang.forEach(month => {
          if(!this.pushDoanhThu(month)) {
            this.dataSetChart.push(0);
          }
        })
      } else {
        console.error("No data received from the service.");
      }
      this.chart.destroy();
      this.renderChart() 

  ;
      })

      console.log(this.dataSetChart);
      
  }
  constructor(
    private service:OtherAdminService
  ){

  }
  pushDoanhThu(month:any):Boolean {
    for (let i = 0; i < this.doanhThuThangTheoNam.length; i++) {
      if(month == this.doanhThuThangTheoNam[i].thang) {
        this.dataSetChart.push(this.doanhThuThangTheoNam[i].doanh_thu);
        return true;
      }
    }
    return false;
  }
  renderChart() {

    const canvas = <HTMLCanvasElement>document.getElementById('columnChart');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Không tìm thấy ngữ cảnh vẽ hợp lệ.");
      return;
    }
  

    const data = {

      labels: this.thang, // Ngày trong tháng
      datasets: [
        {
          label: 'Tổng doanh thu', // Doanh thu
          data: this.dataSetChart, // Dữ liệu doanh thu
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Màu nền cột
          borderColor: 'rgba(75, 192, 192, 1)', // Màu viền cột
          borderWidth: 1
        }
      ], 
    };

// Thêm giá trị doanh thu vào mảng data.datasets[0].data
    const options: ChartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}
