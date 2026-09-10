import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import foodieData from '../../../assets/foodie.json';
@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-detail',
  styleUrl: './restaurant-detail.css',
  templateUrl: './restaurant-detail.html',
})
export class RestaurantDetail {
  foodie = foodieData;

  restaurantId = 0;

  restaurant = this.foodie.restaurants.find(
    (restaurant) => restaurant.id === 0
  );
  restaurantFoodItems = this.foodie.foodItems.filter(
  (food) => food.restaurant_id === 0
);
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.restaurantId = Number(params['id']);
      this.loadRestaurant();
    });
  }

   loadRestaurant() {
    this.restaurant = this.foodie.restaurants.find(
      (restaurant) => restaurant.id === this.restaurantId
    );

    this.restaurantFoodItems = this.foodie.foodItems.filter(
      (food) => food.restaurant_id === this.restaurantId
    );
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
