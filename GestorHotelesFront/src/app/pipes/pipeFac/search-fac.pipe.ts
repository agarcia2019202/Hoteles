import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFac'
})
export class SearchFacPipe implements PipeTransform {

  transform(invoice: any, search: any): any {
    if(search == undefined){
      return invoice;
    }else{
      return invoice.filter(invoice2=>{
        return invoice2.users[0].name.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
