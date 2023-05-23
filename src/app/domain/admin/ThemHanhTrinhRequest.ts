import { TauComponent } from "src/app/viewer/admin/tau/tau.component";
import { Tau } from "./Tau";

export class ThemHanhTrinhRequest{
    id:string;
    gaDi:string;
    gaDen:string;
    ngayDi:string;
    ngayDen:string;
    gioDi:string;
    gioDen:string;
    trangThai:number;
    giaVe:number;
    tau:Tau;

    constructor(){
        this.gaDi="";
        this.gaDen = "";
        this.ngayDi = "";
        this.ngayDen = "";
        this.gioDi = "";
        this.gioDen = "";
        this.trangThai = 1;
        this.giaVe;
        this.tau ;
    }
}