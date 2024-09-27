// import { Pipe, PipeTransform } from '@angular/core';
// import { foodItem } from '../Interfaces';
// import { first } from 'rxjs/operators';
// import { FoodService } from '../services';

// @Pipe({
//   name: 'wildSearch',
//   pure: false
// })
// export class WildSearchPipe implements PipeTransform {
//   public foodItems: foodItem[];

//   constructor(
//     private foodService: FoodService,
//   ) { }

//   ngOnInit(): void {
//     this.loadAllFoodItems();
//   }

//   transform(items: any[], filter: Object): any {
//     if (!items || !filter){
//       return items;
//     }
//     return items.filter(item => item.dishName.indexOf(filter.dishName) !== -1)
//   }
//   private loadAllFoodItems(){
//     this.foodService.getAllFoodItems().pipe(first()).subscribe(items => {
//       this.foodItems = items;
//     })
//   }

// }