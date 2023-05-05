import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../domain/SearchInfo.model';
import { TimChuyenTauRequest } from '../domain/TimChuyenTauRequest';
import { VeTauInfo } from '../domain/VeTauInfo';
import { KiemTraVeRequest } from '../domain/KiemTraVeRequest';
import { KiemTraVeInfo } from '../domain/KiemTraVeInfo';
import { DanhSachToaRequest } from '../domain/DanhSachToaRequest';
import { DanhSachToaResponse } from '../domain/DanhSachToaResponse';
import { DanhSachGheRequest } from '../domain/DanhSachGheRequest';
import { DanhSachGheResponse } from '../domain/DanhSachGheResponse';
import { map } from 'rxjs/operators';
import { VeTauInfoKhuHoi } from '../domain/VeTauInfoKhuHoi';
import { DatCho } from '../domain/DatCho';
import { gheDaDat } from '../domain/GheDaDat';
import { DatChoInfo } from '../domain/DatChoInfo';
import { TraCho } from '../domain/TraCho';
import { XacNhanThongTinVe } from '../domain/XacNhanThongTinVe';
import { XacNhanThongTinVeInfo } from '../domain/XacNhanThongTinVeInfo';
import { XacNhanThongTinVeInfoMoMo } from '../domain/XacNhanThongTinVeInfoMoMo';


@Injectable({
  providedIn: 'root'
})
export class MachineService {
  private confirmationCode: string;

  private REST_API_SERVER='http://localhost:8080/v1';
  private httpOptions ={
    headers: new HttpHeaders({
      
      'Content-Type':'application/json',
      // 'Origin': 'http://localhost:4200' // Thay localhost:4200 bằng domain của ứng dụng Angular của bạn

    }),
    
  };
  constructor(private http: HttpClient) { }

  public getKiemTraVe(kiemTraVeRequest: KiemTraVeRequest): Observable<KiemTraVeInfo> {
    const url = `${this.REST_API_SERVER}/kiemtrave`;
    return this.http.post<KiemTraVeInfo>(url, kiemTraVeRequest, this.httpOptions).pipe(
      map((response: KiemTraVeInfo) => {
        // Thay đổi giá trị thuộc tính DA_THANH_TOAN trên đối tượng kết quả trả về
        response.tinhTrang = 'Đã thanh toán';
        return response;
      })
    );
    
  }
  public getHanhTrinhTau(timChuyenTauRequest: TimChuyenTauRequest): Observable<VeTauInfo> {
    const url = `${this.REST_API_SERVER}/hanhtrinhtau`;
    return this.http.post<VeTauInfo>(url, timChuyenTauRequest, this.httpOptions);
  }
  public getHanhTrinhTauKhuHoi(timChuyenTauRequest: TimChuyenTauRequest): Observable<VeTauInfoKhuHoi> {
    const url = `${this.REST_API_SERVER}/hanhtrinhtau`;
    return this.http.post<VeTauInfoKhuHoi>(url, timChuyenTauRequest, this.httpOptions);
  }

  public getDanhSachToa(danhSachToaRequest: DanhSachToaRequest): Observable<DanhSachToaResponse[]> {
    const url = `${this.REST_API_SERVER}/toas`;
    return this.http.post<DanhSachToaResponse[]>(url, danhSachToaRequest, this.httpOptions);
  }
  public getDanhSachGhe(danhSachGheRequest: DanhSachGheRequest): Observable<DanhSachGheResponse[]> {
    const url = `${this.REST_API_SERVER}/ghes`;
    return this.http.post<DanhSachGheResponse[]>(url, danhSachGheRequest, this.httpOptions);
  }
  public getDatCho(datCho: DatCho): Observable<any> {
    const url = `${this.REST_API_SERVER}/datcho`;
    return this.http.post<any>(url, datCho, this.httpOptions);
  }

  // public getTraCho(traCho: TraCho): Observable<boolean> {
  //   const url = `${this.REST_API_SERVER}/tracho`;
  //   return this.http.post<any>(url, traCho, this.httpOptions);
  // }
  public traCho(traCho: TraCho): Observable<boolean> {
    const url = `${this.REST_API_SERVER}/tracho`;
    return this.http.delete<boolean>(url, { body: traCho, headers: this.httpOptions.headers });
  }
  

  getChoNgoi():Observable<any[]>{
    return this.http.get<any>(this.REST_API_SERVER+'/hanhtrinhtau');

  }
  public thanhToanMomo(xacnhanthongtinve:XacNhanThongTinVe): Observable<XacNhanThongTinVeInfoMoMo>{
    const url = `${this.REST_API_SERVER}/muave`;
    return this.http.post<XacNhanThongTinVeInfoMoMo>(url, xacnhanthongtinve, this.httpOptions);
  }
  public thanhToanTraSau(xacnhanthongtinve:XacNhanThongTinVe): Observable<XacNhanThongTinVeInfo>{
    const url = `${this.REST_API_SERVER}/muave`;
    return this.http.post<XacNhanThongTinVeInfo>(url, xacnhanthongtinve, this.httpOptions);
  }

  public getSearch( ):Observable<any>{
    return this.http.get(this.REST_API_SERVER+'/hanhtrinhtau')
  }

  sendConfirmationEmail(email: string): void {
    const emailBody = `Your confirmation code is: ${this.confirmationCode}`;
    const url = `https://your-email-service-api.com/send-email?to=${email}&body=${emailBody}`;
    this.http.post(url, {}).subscribe(() => {
      console.log('Email sent successfully');
    }, (error) => {
      console.error('Error sending email:', error);
    });
  }
}
