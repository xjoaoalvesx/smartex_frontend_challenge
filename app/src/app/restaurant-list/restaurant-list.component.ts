import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { IRestaurant } from '../shared/interfaces';

@Component({
  selector: 'app-restaurant-list',
  template: `
    <mat-card id="highlight-postcode">
      <mat-card-content> <h1> PostCode </h1> {{ postcode }} </mat-card-content>
    </mat-card>
    <div id="rlist-container">
      <mat-accordion>
        <mat-expansion-panel hideToggle *ngFor="let restaurant of restaurants">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{restaurant.Name}}
            </mat-panel-title>
            <mat-panel-description>
              {{restaurant.Rating.Average}}
            </mat-panel-description>
          </mat-expansion-panel-header>
          <p *ngFor="let cuisine of restaurant.Cuisines"> {{cuisine.Name}}</p>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [
    '#rlist-container    { width: 50%; margin: auto}',
    '#highlight-postcode { width: 50%; margin: 20px auto 10px}'
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
            this.restaurants = res.filter( (r: IRestaurant) => r.IsOpenNow)
            //console.log(this.restaurants)
          })
      }
    }

    this.route.queryParams.subscribe( (params) => {
      this.postcode = '' + (params['code'] || '')
      getRestaurants()
    })

  }
}
