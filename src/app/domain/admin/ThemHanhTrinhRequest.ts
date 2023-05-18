import { TauComponent } from "src/app/viewer/admin/tau/tau.component";
import { Tau } from "./Tau";

export class ThemHanhTrinhRequest{
    gaDi:string;
    gaDen:string;
    ngayDi:string;
    ngayDen:string;
    gioDi:string;
    gioDen:string;
    trangThai:number;
    giaVe:number;
    tau:Tau;
}