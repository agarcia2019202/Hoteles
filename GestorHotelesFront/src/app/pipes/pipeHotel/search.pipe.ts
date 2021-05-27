import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(hotel:any, search: any): any {
    if(search == undefined){
        return hotel;
    }else{
      return hotel.filter( hotel2=>{
        return hotel2.name.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
