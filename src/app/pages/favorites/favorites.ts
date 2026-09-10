import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import foodieData from '../../../assets/foodie.json';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  foodie = foodieData;

  favoriteFoodIDs: number[] = [];

  favoriteFoods = this.foodie.foodItems.filter(
    (food) => this.favoriteFoodIDs.includes(food.id)
  );

  constructor() {
    this.loadFavorites();
  }

  loadFavorites() {
    const savedFavorites = localStorage.getItem('favoriteFoodIDs');

    if (savedFavorites) {
      this.favoriteFoodIDs = JSON.parse(savedFavorites);
    }

    this.favoriteFoods = this.foodie.foodItems.filter(
      (food) => this.favoriteFoodIDs.includes(food.id)
    );
  }

  removeFavorite(foodId: number) {
    this.favoriteFoodIDs = this.favoriteFoodIDs.filter(
      (id) => id !== foodId
    );

    localStorage.setItem(
      'favoriteFoodIDs',
      JSON.stringify(this.favoriteFoodIDs)
    );

    this.loadFavorites();
  }

  clearFavorites() {
    this.favoriteFoodIDs = [];

    localStorage.removeItem('favoriteFoodIDs');

    this.loadFavorites();
  }

  getRestaurantName(restaurantId: number) {
    const restaurant = this.foodie.restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );

    return restaurant ? restaurant.name : 'ไม่พบร้านอาหาร';
  }

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
}