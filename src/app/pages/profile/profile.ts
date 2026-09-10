import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import foodieData from  '../../../assets/foodie.json';
@Component({
  imports: [RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  foodie = foodieData;

  userId = 0;

  user = this.foodie.users.find(
    (user) => user.id === 0);

  userReviews = this.foodie.foodReviews.filter(
    (review)=> review.user_id === 0);

  favoriteFoodIDs : number[] = [];

  constructor(private route : ActivatedRoute){
    this.route.params.subscribe((params)=>{
      this.userId = Number(params['id']);
      this.loadProfile();
    });
  }
  loadProfile() {
    this.user = this.foodie.users.find(
      (user)=> user.id === this.userId
    );
    this.userReviews = this.foodie.foodReviews.filter(
      (review)=> review.user_id === this.userId
    );

    const saveFavorites = localStorage.getItem('favoriteFoodIDs');

    if (saveFavorites){
      this.favoriteFoodIDs = JSON.parse(saveFavorites);
    }
  }
  getFoodName(foodItemid: number){
    const food = this.foodie.foodItems.find(
      (food)=> food.id === foodItemid
    );

    return food ? food.name : 'ไม่พบเมนูอาหาร'
  }
  
}
