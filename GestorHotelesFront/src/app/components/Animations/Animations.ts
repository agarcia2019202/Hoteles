import {trigger, style, animate, transition} from '@angular/animations';


export const fadeIn = [
    trigger('fadeIn',
    [
        transition(':enter',[
            style({
                opacity:0
            }),animate('800ms linear')
        ])
    ])
]