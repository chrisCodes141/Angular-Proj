import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { foodItem } from '../Interfaces';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAllFoodItems(){
    return this.http.get<foodItem[]>('/feed');
  }
}
