import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Interfaces';
import { foodItem } from 'src/app/Interfaces/food';
import { FoodService, AuthenticationService, CartService } from 'src/app/services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-foodlist',
  templateUrl: './foodlist.component.html',
  styleUrls: ['./foodlist.component.css']
})
export class FoodlistComponent implements OnInit, OnDestroy {
  public currentUser: User;
  public foodItems: foodItem[];
  public selectedFootItem: any;
  public foodItemList: any[] = [];
  public errorItem: boolean = false;
  public currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private foodService: FoodService,
    private CartService: CartService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadAllFoodItems();
  }

  ngOnDestroy():void{
    if(this.currentUserSubscription){
      this.currentUserSubscription.unsubscribe();
    }
  }

  private loadAllFoodItems(){
    this.foodService.getAllFoodItems().pipe(first()).subscribe(items => {
      this.foodItems = items;
    })
  }

  public addToCart(item: any):void{ 
    alert("Item added");
    this.foodItemList.push(item);
    this.CartService.setCartwithItems(this.foodItemList);
    this.errorItem = false;
  }

}
