import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchReservation'
})
export class SearchReservationPipe implements PipeTransform {

  transform(reservation: any, search: any): any {
    if(search == undefined){
      return reservation;
    }else{
      return reservation.filter(reservation2=>{
        return reservation2.users[0].name.toLowerCase().includes(search.toLowerCase())
      })
    }
  }

}
