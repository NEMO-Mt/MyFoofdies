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

  //สร้างตัวแปรมาเก็บ ชุดข้อมูลที่เอามาจาก JSON 
  filteredRestaurans = foodieData.restaurants;
  filteredFoods = foodieData.foodItems;

  //ดึงเอาประเภทร้านอาหารจาก ข้อมูลร้านทั้งหมด แล้วเก็บไม่ให้ซ้ำกัน for เอาไปสร้างปุ่มกรองหน้าใน search 
  constructor(private route: ActivatedRoute) {
    //ลูปร้านอาหารทีละร้านอาหารออกมาทั้งหมด
    for (const restaurant of foodieData.restaurants) {
      //เช็คว่ามีประเภทร้านนี้หรือยัง : ถ้ายังไม่มี 
      if (!this.restaurantTypes.includes(restaurant.restaurant_type)) {
        //ถ้ายังไม่มีจะทำการเพิ่มประเภทนั้นเข้า array  restaurantTypes
        this.restaurantTypes.push(restaurant.restaurant_type);
      }
    }
  }
//ฟังก์ชันการ updatekeyword  
  updateKeyword(keyword: string) {
    this.keyword = keyword;
    this.filterResults();
  }
//รับประเภทร้านที่ผู้ใช้เลือกแล้วเก็บค่านั้นไว้ 
  selectRestaurantType(type: string) {
    this.selectedType = type;
    this.filterResults();
  }

  filterResults() {
    const searchKeyword = this.keyword.trim().toLowerCase();
    //เอาร้านอาหารทั้งหมดในข้อมูลร้านอาหารมีตรวจทีละร้านด้วย filter แล้วก็จะดูทีละค่าว่า ผ่านเงื่อนไขมั้ย
    this.filteredRestaurans = this.foodie.restaurants.filter(
      (restaurant) => {
        //ตัวที่เราเช็คว่า สิ่งที่พิมพ์มีมั้ย 
        const matchesKeyword = restaurant.name
          .toLowerCase()
          .includes(searchKeyword);

        const matchesType =
          this.selectedType === 'ทั้งหมด' ||
          restaurant.restaurant_type === this.selectedType;

        return matchesKeyword && matchesType;
      }
    );

    //กรองเมนูอาหาร : เอาข้อมูลเมนูอาหารมาเก็บไว่ใน filteredFoods 
    this.filteredFoods = this.foodie.foodItems.filter(
      (food) => {
        // ทำการเช็ค ว่าสิ่งทีพิมพ์ กับข้อมูลที่มีตรงกันมั้ย 
        const matchesKeyword = food.name
          .toLowerCase()
          .includes(searchKeyword);

          //เช็คว่า id ร้านอาหารในหมวดร้านอาหาร กับในหมวดของรายการอาหารตรงกันมั้ย
          //ดึงเอาข้อมูลร้านั้นมาทั้งก้อน ของเมนูนั้นออกมา
        const restaurant = this.foodie.restaurants.find(
          (restaurant) => restaurant.id === food.restaurant_id
        );
          //เช็คประเภทการกรองร้านอาหาร
        const matchesType =
          this.selectedType === 'ทั้งหมด' ||
          restaurant?.restaurant_type === this.selectedType;

        return matchesKeyword && matchesType;
      }
    );
  }

  getRestaurantName(restaurantId: number) {
    const restaurant = this.foodie.restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );

    return restaurant ? restaurant.name : 'ไม่พบร้านอาหาร';
  }
}