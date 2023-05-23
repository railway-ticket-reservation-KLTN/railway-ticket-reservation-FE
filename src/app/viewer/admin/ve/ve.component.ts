import { Component, OnInit, SecurityContext } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OtherAdminService } from 'src/app/service/other-admin-service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgZone } from '@angular/core';
import { MachineService } from 'src/app/service/machine-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-ve',
  templateUrl: './ve.component.html',
  styleUrls: ['./ve.component.css']
})
export class VeComponent implements OnInit {
  Ve: any[];
  maDatCho: string;
  dataRequest: any[] = [];
  selectedLoads: any[] = [];
  items: any[]; // Dữ liệu cần phân trang
  pageSize = 10; // Số mục hiển thị trên mỗi trang
  currentPage = 1; // Trang hiện tại
  totalItems: number; // Tổng số mục
  isShow = true;
  constructor(
    private service: OtherAdminService,
    private _dialog: MatDialog,
    private ngZone: NgZone,
    private serviceKH: MachineService,
    protected sanitizer: DomSanitizer
  ) {

  }
  ngOnInit() {
    this.service.getDanhSachVe().subscribe(data => {
      this.Ve = data;
      this.totalItems = this.Ve.length;
    }, (error) => {
      this.isShow = false;
      alert("Không có quyền truy cập")

    });
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

  btnDatVe() {
    for (let i = 0; i < this.selectedLoads.length; i++) {
      if (this.selectedLoads[i].tinhTrang == "CHUA_THANH_TOAN") {
        this.service.xacNhanDatVe(this.selectedLoads).subscribe(data => {
          alert("Vé" + " " + this.selectedLoads[i].maVe + " " + "Đặt thành công");
          console.log(data);

          this.ngZone.run(() => {
            // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
            this.loadData();
          });
          for (let i = 0; i < data.length; i++) {
            const   hanhTrinh = data[i].hanhTrinh;
            this.dataRequest[i] = {
              maVe: data[i].veTau.maVe,
              tenHanhKhach: data[i].veTau.tenHanhKhach,
              soGiayTo: data[i].veTau.soGiayTo,
              donGia: data[i].veTau.donGia,
              doiTuong: data[i].veTau.doiTuong,
              tenTau: data[i].veTau.tenTau,
              soGhe: data[i].veTau.soGhe,
              soToa: data[i].veTau.soToa,
              gaDi: data[i].veTau.hanhTrinh.gaDi,
              gaDen: data[i].veTau.hanhTrinh.gaDen,
              ngayDi: data[i].veTau.hanhTrinh.ngayDi,
              gioDi: data[i].veTau.hanhTrinh.gioDi,
            }
          }

              console.log(this.dataRequest);
              // this.serviceKH.getPDFInve(this.dataRequest).subscribe(data =>{
              //       console.log(data);
              //       const pdf = new Blob([data], { type: 'application/pdf' });
              //       const blobUrl = URL.createObjectURL(pdf);
              //       const iframe = document.createElement('iframe');
              //       // const iframe = document.getElementById('printf');
              //       iframe.id='print'
              //       iframe.style.display = 'none';
              //       iframe.src = blobUrl;
              //       document.body.appendChild(iframe);
              //       iframe.getElementsByTagName('iframe').contentWindow;      
              // })
              this.serviceKH.getPDFInve(this.dataRequest).subscribe(data => {
                console.log(data);
                const pdf = new Blob([data], { type: 'application/pdf' });
                const blobUrl = URL.createObjectURL(pdf);
                const iframe = document.createElement('iframe');
                iframe.id = 'print';
                iframe.style.display = 'none';
                iframe.src = blobUrl;
                document.body.appendChild(iframe);
                iframe.onload = () => {
                  const contentWindow = iframe.contentWindow;
                  if (contentWindow) {
                    contentWindow.print();
                  }
                };
              });
        })
      } else {
        alert("Vé" + " " + this.selectedLoads[i].maVe + " " + "không có quyền đặt");
      }

    }
  }

  generatePDF(data: any[]) {
    this.serviceKH.getPDFInve(data).subscribe(
      response => {
        // Xử lý dữ liệu Blob tại đây
        const blobData: Blob = response;
        // Ví dụ: Tạo URL cho Blob và tải xuống
        const blobUrl = window.URL.createObjectURL(blobData);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'file.pdf';
        link.click();
      },
      error => {
        // Xử lý lỗi trong quá trình tạo PDF
        console.error(error);
      }
    );
  }
  btnTraVe() {
    for (let i = 0; i < this.selectedLoads.length; i++) {
      if (this.selectedLoads[i].tinhTrang == "DA_MUA") {
        this.service.xacNhanTraVe(this.selectedLoads).subscribe(data => {
          alert("Vé" + " " + this.selectedLoads[i].maVe + " " + "trả thành công");
          this.ngZone.run(() => {
            // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
            this.loadData();
          });
        })
      }
      else {
        alert("Vé" + " " + this.selectedLoads[i].maVe + " " + "không có quyền trả");
      }
    }

  };

  // Hàm xử lý sự kiện chuyển trang
  onPageChange(event: number): void {
    this.currentPage = event;
  }
  loadData() {
    this.service.getDanhSachVe().subscribe(data => {
      console.log(data);
      this.Ve = data;
    });
  }
  // Lấy dữ liệu từ nguồn nào đó và cập nhật totalItems
  btnSearch() {
    console.log(this.maDatCho);
    this.service.getDSMaDatCho(this.maDatCho).subscribe(data => {
      console.log(data);

    });
    this.ngZone.run(() => {
      // Gọi loadData() hoặc bất kỳ phương thức nào để load lại dữ liệu
      this.service.getDSMaDatCho(this.maDatCho).subscribe(data => {
        this.Ve = data;

      });
    });
  }

}
