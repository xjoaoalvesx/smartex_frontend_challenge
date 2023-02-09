import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestaurantsService } from '../services/restaurants.service';
import { IRestaurant } from '../shared/interfaces';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-restaurant-list',
  template: `
    <mat-card id="highlight-postcode" color="primary">
      <mat-card-content> <h1> Submit postcode to search for restaurants </h1>
        <form id="postcode-form" [formGroup]="postcodeInput" (ngSubmit)="onSubmit()" >
          <mat-form-field>
            <mat-label>Postcode</mat-label>
            <input matInput placeholder="Ex. ec4m" formControlName="postcode">
          </mat-form-field>
        </form>
      </mat-card-content>
    </mat-card>
    <mat-card id="restaurants-header">
      <mat-card-content> 
        <h2> Currently Open Restaurants {{restaurants.length}} </h2>
      </mat-card-content>
    </mat-card>
    <div id="rlist-container">
      <cdk-virtual-scroll-viewport itemSize="20" id="viewport">
        <mat-accordion color="primary" multi>
          <mat-expansion-panel hideToggle *cdkVirtualFor="let restaurant of restaurants; templateCacheSize: 0">
            <mat-expansion-panel-header>
              <mat-panel-title>
                {{restaurant.Name}}
              </mat-panel-title>
              <mat-panel-description>
                <mat-icon class="rating-icon" aria-hidden="false" fontIcon="star"></mat-icon>
                {{restaurant.Rating.Average}}
              </mat-panel-description>
            </mat-expansion-panel-header>
            <p *ngFor="let cuisine of restaurant.Cuisines"> {{cuisine.Name}}</p>
          </mat-expansion-panel>
        </mat-accordion>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    '#rlist-container    { width: 50%; height: 60%; margin: auto }',
    '#highlight-postcode { width: 50%; margin: 20px auto 10px }',
    '#postcode-form      { margin: auto }',
    '#restaurants-header { width: 50%; margin: 0px auto 10px }',
    '.rating-icon        { scale: 0.8 }',
    '#viewport           { width: 100%; height: 100% }'
  ]
})
export class RestaurantListComponent implements OnInit {

  postcode: string = ''
  restaurants: IRestaurant[] = []

  postcodeInput = this.formBuilder.group({
    postcode: '',
  });

  constructor(
    private service: RestaurantsService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.postcode = this.postcodeInput.value.postcode || ''
    this.getRestaurants()
  }

  getRestaurants() {
    if(this.postcode.length > 0) {
      this.service
          .getRestaurants(this.postcode)
          .subscribe(res => {
            this.restaurants = res.filter( (r: IRestaurant) => r.IsOpenNow)
            if (this.restaurants.length === 0) {
              this.snackBar.open('No Open Restaurants', 'Ups!', {
                duration: 3000
              });
            }
          })
    } 
  }

  ngOnInit(): void {

  }
}
