import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { IRestaurant } from '../shared/interfaces';

@Component({
  selector: 'app-restaurant-list',
  template: `
    <p>
      {{postcode}}
    </p>
    <ul>
      <li *ngFor="let restaurant of restaurants">
          {{ restaurant.Name }} {{ restaurant.Rating.Average }}
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class RestaurantListComponent implements OnInit {

  postcode: string = ''
  restaurants: IRestaurant[] = []

  constructor(
    private service: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    let getRestaurants = () => {
      if(this.postcode.length > 0) {
        this.service
          .getRestaurants(this.postcode)
          .subscribe(res => {
            this.restaurants = res
            console.log(this.restaurants)
          })
      }
    }

    this.route.queryParams.subscribe( (params) => {
      this.postcode = '' + (params['code'] || '')
      getRestaurants()
    })

  }
}
