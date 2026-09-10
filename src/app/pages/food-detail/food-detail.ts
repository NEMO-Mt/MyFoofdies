import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import foodieData from '../../../assets/foodie.json';
@Component({
  imports: [],
  selector: 'app-food-detail',
  styleUrl: './food-detail.css',
  templateUrl: './food-detail.html',
})
export class FoodDetail {
  foodie = foodieData;
  foodId = 0;

  food = this.foodie.foodItems.find(
    (food) => food.id === 0
  );

  restaurant = this.foodie.restaurants.find(
    (restaurant) => restaurant.id === 0
  );

  foodReviews = this.foodie.foodReviews.filter(
    (review) => review.food_item_id === 0
  );
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.foodId = Number(params['id']);

      this.loadFoodDetail();
    });
  }
  loadFoodDetail() {
    this.food = this.foodie.foodItems.find(
      (food) => food.id === this.foodId);

    if (this.food) {
      const restaurantID = this.food.restaurant_id;

      this.restaurant = this.foodie.restaurants.find(
        (restaurant) => restaurant.id);
    }
    this.foodReviews = this.foodie.foodReviews.filter(
      (review) => review.food_item_id === this.foodId
    );
    console.log('เมนู:', this.food);
    console.log('ร้าน:', this.restaurant);
    console.log('รีวิว:', this.foodReviews);

  }
  getUserName(userId: number) {
    const user = this.foodie.users.find(
      (user) => user.id === userId
    );

    return user ? user.name : 'ไม่พบผู้ใช้งาน';
  }
   getAverageRating() {
    if (this.foodReviews.length === 0) {
      return 'ยังไม่มีรีวิว';
    }

    let totalRating = 0;

    for (const review of this.foodReviews) {
      totalRating += review.rating;
    }

    return (totalRating / this.foodReviews.length).toFixed(1);
  }
}
