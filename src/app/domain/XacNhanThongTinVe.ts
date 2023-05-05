import { KhachDatVe } from "./KhachDatVe";
import { VeTaus } from "./VeTaus";

export class XacNhanThongTinVe{
    veTaus:VeTaus[];
    khachDatVe:KhachDatVe;
    hinhThucThanhToan:string;
    ngayLap:string

    constructor(){
        this.veTaus = [];
        this.khachDatVe ;
        this.hinhThucThanhToan = "";
        this.ngayLap = "2023-4-16";
    }
}