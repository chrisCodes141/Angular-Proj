import { Component, OnInit, Input } from '@angular/core';
import { foodItem } from 'src/app/Interfaces/food';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'src/app/services';
import { CartService } from '../../services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public trackArea: boolean = false;
  public cartItems: foodItem[]=[];
  public errorItem: boolean = false;

  constructor(private CartService: CartService, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.cartItems = this.CartService.getCartItems();
  }

  public total(): number {
    return this.cartItems.reduce((total, item) => total + item.cost, 0);
  }

  public addToCart(item: foodItem):void{
    if (this.cartItems.indexOf(item) === -1){
      this.cartItems.push(item);
      this.errorItem = false;
    } else if (this.cartItems.indexOf(item) > -1){
      this.errorItem=true;
    }
  }

  public placeOrder(): void {
    this.CartService.placeOrder(this.cartItems).subscribe(
      data => {
        this.alertService.success('Order Placed!', true);
        this.router.navigate(['/home/track']);
        this.CartService.emptyCart();
      },
      error => {
        this.alertService.error(error);
      });
  }


  public removeItem(index:number): void {
    console.log("clicked remove")
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }
}
