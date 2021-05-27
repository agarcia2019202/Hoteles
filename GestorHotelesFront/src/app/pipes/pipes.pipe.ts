import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(rooms:any, search: any): any {
    if(search == undefined){
        return rooms;
    }else{
      return rooms.filter( rooms12=>{
        return rooms12.nameRoom.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
