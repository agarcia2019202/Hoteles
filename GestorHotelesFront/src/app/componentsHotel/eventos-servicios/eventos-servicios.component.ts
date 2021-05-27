import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos-servicios',
  templateUrl: './eventos-servicios.component.html',
  styleUrls: ['./eventos-servicios.component.css']
})
export class EventosServiciosComponent implements OnInit {
  public sidebarStatus;
  
  constructor() { 
    this.sidebarStatus= 1;
    
    
  }

  

  ngOnInit(): void {
    
  }

  

  status(status){
    this.sidebarStatus = status;
  }
}
