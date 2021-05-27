import { Component, OnInit } from '@angular/core';
import {fadeIn} from  "../Animations/Animations"

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  animations: [fadeIn]

})
export class ServiciosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
