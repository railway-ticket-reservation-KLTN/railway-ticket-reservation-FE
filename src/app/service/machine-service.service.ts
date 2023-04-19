import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../domain/SearchInfo.model';
import { TimChuyenTauRequest } from '../domain/TimChuyenTauRequest';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private REST_API_SERVER='http://localhost:8080/v1';
  private httpOptions ={
    headers: new HttpHeaders({
      'Content-Type':'application/json',
    }),
  };
  constructor(private http: HttpClient) { }

  public getHanhTrinhTau(timChuyenTauRequest: TimChuyenTauRequest): Observable<any> {
    const url = `${this.REST_API_SERVER}/hanhtrinhtau`;
    return this.http.post<any>(url, timChuyenTauRequest, this.httpOptions);
  }

  getChoNgoi():Observable<any[]>{
    return this.http.get<any>(this.REST_API_SERVER+'/hanhtrinhtau');

  }

  public getSearch( ):Observable<any>{
    return this.http.get(this.REST_API_SERVER+'/hanhtrinhtau')
  }
}
