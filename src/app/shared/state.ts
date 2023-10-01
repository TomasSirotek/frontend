import { Injectable } from "@angular/core";
import { Box } from "../modules/management/models/box";

@Injectable({
    providedIn: 'root'  
})

export class State {   
    boxes: Box  [] = [];   
}