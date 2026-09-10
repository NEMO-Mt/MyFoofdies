import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { RestaurantDetail } from './pages/restaurant-detail/restaurant-detail';
import { FoodDetail } from './pages/food-detail/food-detail';
import { Favorites } from './pages/favorites/favorites';
import { Profile } from './pages/profile/profile';
export const routes: Routes = [
    {
    path: '',
    component: Home,
  },
  {
    path: 'search',
    component: Search,
  },
  {
    path: 'restaurant/:id',
    component: RestaurantDetail,
  },
  {
  path: 'foods/:id',
  component: FoodDetail,
},
{
  path: 'Favorites',
  component: Favorites,
},
{
  path: 'profile/:id',
  component: Profile,
},
];
