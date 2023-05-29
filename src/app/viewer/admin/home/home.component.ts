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
  thang:any[]=[];
  doanhThu:any[]=[];
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
        for (let i = 0; i < this.doanhThuThangTheoNam.length; i++) {
          this.thang.push(this.doanhThuThangTheoNam[i].thang);
          this.thang = this.thang.slice(0, 1);

          this.doanhThu.push(this.doanhThuThangTheoNam[i].doanh_thu);
          this.thang = this.doanhThu.slice(0, 1);

        }
        console.log(this.thang);
        console.log(this.doanhThu);
      } else {
        console.error("No data received from the service.");
      }
      this.chart.destroy();
      this.renderChart() 
      


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
