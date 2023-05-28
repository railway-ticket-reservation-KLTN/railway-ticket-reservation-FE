import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, filteredGaDi: string, filteredGaDen: string,filteredNgayDi: string, filteredNgayDen:string ): any[] {
    // Áp dụng hàm applyFilters() tại đây
    // Gọi this.applyFilters(items, searchText, filteredGaDi)
    // và trả về kết quả
    return this.applyFilters(items, searchText, filteredGaDi,filteredGaDen, filteredNgayDi, filteredNgayDen );
  }

//   applyFilters(items: any[], searchText: string, filteredGaDi: string): any[] {
//     return items.filter((load: any) => {
//       if (filteredGaDi && searchText) {
//         return (
//           load.gaDi.toLowerCase().includes(filteredGaDi.toLowerCase()) &&
//           load.gaDi.toLowerCase().includes(searchText.toLowerCase())
//         );
//       } else if (filteredGaDi) {
//         return load.gaDi.toLowerCase().includes(filteredGaDi.toLowerCase());
//       } else if (searchText) {
//         return load.gaDi.toLowerCase().includes(searchText.toLowerCase());
//       } else {
//         return true;
//       }
//     });
//   }

applyFilters(items: any[], searchText: string, filteredGaDi: string, filteredGaDen: string, filteredNgayDi: string, filteredNgayDen: string): any[] {
    return items.filter((load: any) => {
      const gaDiMatched = !filteredGaDi || load.gaDi.toLowerCase().includes(filteredGaDi.toLowerCase());
      const gaDenMatched = !filteredGaDen || load.gaDen.toLowerCase().includes(filteredGaDen.toLowerCase());
      const ngayDiMatched = !filteredNgayDi || load.ngayDi.toLowerCase().includes(filteredNgayDi.toLowerCase());
      const ngayDenMatched = !filteredNgayDen || load.ngayDen.toLowerCase().includes(filteredNgayDen.toLowerCase());
  
      if (searchText) {
        const searchTextMatched = load.gaDi.toLowerCase().includes(searchText.toLowerCase()) ||
          load.gaDen.toLowerCase().includes(searchText.toLowerCase()) ||
          load.ngayDi.toLowerCase().includes(searchText.toLowerCase()) ||
          load.ngayDen.toLowerCase().includes(searchText.toLowerCase());
        
        return gaDiMatched && gaDenMatched && ngayDiMatched && ngayDenMatched && searchTextMatched;
      }
  
      return gaDiMatched && gaDenMatched && ngayDiMatched && ngayDenMatched;
    });
  }
  
}
