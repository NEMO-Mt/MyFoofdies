import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import foodieData from '../../../assets/foodie.json';
@Component({
  imports: [],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {
  foodie = foodieData;

  keyword = '';
  selectedType = 'ทั้งหมด';

  restaurantTypes: string[] = ['ทั้งหมด'];

  filteredRestaurans = foodieData.restaurants;
  filteredFoods = foodieData.foodItems;

  constructor(private route: ActivatedRoute) {
    for (const restaurant of foodieData.restaurants) {
      if (!this.restaurantTypes.includes(restaurant.restaurant_type)) {
        this.restaurantTypes.push(restaurant.restaurant_type);
      }
    }
  }
  updateKeyword(keyword : string) {
    this.keyword = keyword;
    this.filterResults();
  }

  selectRestaurantType(type: string) {
    this.selectedType = type;
    this.filterResults();
  }
  filterResults() {
    const searchKeyword = this.keyword.trim().toLowerCase();
    this.filteredRestaurans = this.foodie.restaurants.filter(
      (restaurant)=>{
        const matchesKeyword = restaurant.name
        .toLowerCase()
        .includes(searchKeyword);

        const matchesType = 
        this.selectedType === 'ทั้งหมด'|| restaurant.restaurant_type === this.selectedType;

        return matchesKeyword && matchesType;
      });

  }
  getRestaurantName(restaurantId: number) {
    const restaurant = this.foodie.restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );

    return restaurant ? restaurant.name : 'ไม่พบร้านอาหาร';
  }
  
}
