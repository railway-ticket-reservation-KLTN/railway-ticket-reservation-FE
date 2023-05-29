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
  doanhThuThangTheoNam:any[];
  formattedDoanhThu:any;
  thang:any[];
  doanhThu:any[];
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
      this.thang = this.doanhThuThangTheoNam.map(item => item.thang); // Tạo mảng tháng
      this.doanhThu = this.doanhThuThangTheoNam.map(item => item.doanh_thu); // Tạo mảng doanh thu
    console.log(this.thang)
    console.log(this.doanhThu);
  ;
  
      // Thêm mảng tháng vào mảng doanh thu
    })
  }
  constructor(
    private service:OtherAdminService
  ){

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
          data: this.doanhThu, // Dữ liệu doanh thu
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Màu nền cột
          borderColor: 'rgba(75, 192, 192, 1)', // Màu viền cột
          borderWidth: 1
        }
      ]
    };

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
