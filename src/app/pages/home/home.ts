import { Component } from '@angular/core';
import foodieData from '../../../assets/foodie.json';
import { RouterLink } from '@angular/router';
@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  
  getAverageRating(foodId: number) {
  const reviews = this.foodie.foodReviews.filter(
    (review) => review.food_item_id === foodId
  );

  if (reviews.length === 0) {
    return 'ยังไม่มีรีวิว';
  }

  let totalRating = 0;

  for (const review of reviews) {
    totalRating += review.rating;
  }

  return (totalRating / reviews.length).toFixed(1);
}

getRestaurantName(restaurantId: number) {
  const restaurant = this.foodie.restaurants.find((restaurant) => restaurant.id === restaurantId);
  return restaurant ? restaurant.name : 'ไม่พบร้านอาหาร';
}

isFavorite(foodId: number) {
  return this.favorieFoodID.includes(foodId);
}

toggleFavorite(foodId: number) {
  if(this.isFavorite(foodId)) {
    this.favorieFoodID = this.favorieFoodID.filter(id => id !== foodId);
  }else {
    this.favorieFoodID.push(foodId);
  }
  localStorage.setItem('favoriteFoodIDs', JSON.stringify(this.favorieFoodID));
}
   foodie = foodieData;
   favorieFoodID : number[] =[];
   constructor() {
    const savedFavorites = localStorage.getItem('favoriteFoodIDs');

    if(savedFavorites) {
      this.favorieFoodID = JSON.parse(savedFavorites);
    }
   }
}
