import { HanhTrinh } from "./HanhTrinh";
import { HanhTrinhTraVe } from "./HanhTrinhTraVe";
import { KhachDat } from "./KhachDat";
import { KhachDatVe } from "./KhachDatVe";

export class TraVeInFo{
    id:string;
    maVe:string;
    maDatCho:string;
    ngayMua:string;
    tenHanhKhach:string;
    soGiayTo:string;
    donGia:number;
    loaiVe:string;
    doiTuong:string;
    tenTau:string;
    soGhe:string;
    soToa:string;
    tinhTrang:string;
    trangThai:string;
    thoiGianGiuVe:string;
    khachDatVe:KhachDat;
    hanhTrinh:HanhTrinhTraVe
}