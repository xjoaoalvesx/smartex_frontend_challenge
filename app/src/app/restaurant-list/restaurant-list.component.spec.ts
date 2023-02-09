import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { RestaurantListComponent } from './restaurant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantsService } from '../services/restaurants.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RestaurantListComponent', () => {
  let component: RestaurantListComponent;
  let fixture: ComponentFixture<RestaurantListComponent>;
  let h1: HTMLElement;
  let service: RestaurantsService;
  let spy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantListComponent ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        ScrollingModule,
        MatIconModule
      ],
      providers: [
        RestaurantsService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantListComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('h1');

    service = TestBed.inject(RestaurantsService);

    fixture.detectChanges();

  });

  it('should create RestaurantList Component', () => {
    expect(component).toBeTruthy();
  });

  it('should display input header', () => {
    expect(h1.textContent).toContain('Submit postcode to search for restaurants');
  });

  it('should build empty input field', () => {
    let input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('formControlName')).toEqual('postcode');
    expect(input.getAttribute('value')).toEqual(null);
  });

  it('should bind postcode to the form', () => {
    const inputForm = component.postcodeInput.get('postcode');
    const inputel = fixture.debugElement.query(By.css('input')).nativeElement;

    let dummy = 'somecode';
    inputForm?.setValue(dummy);
    fixture.detectChanges();
    expect(inputel.value).toEqual(dummy);

  });

  it('should call getRestaurants one time', fakeAsync(() => {

    spy = spyOn(component, 'getRestaurants');
    component.getRestaurants();
    expect(spy).toHaveBeenCalled();
    expect( spy.calls.all().length ).toBe(1);

  }));

  it('should display # of currently open restaurants', () => {

    const el = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(el.textContent).toEqual('Currently Open Restaurants ' + component.restaurants.length)

  });

  it('should update Restaurants list after new postcode is submitted', fakeAsync(() => {

    const el = fixture.debugElement.query(By.css('h2')).nativeElement;   // check the number of restaurants with empty string (should be 0)
    expect(el.textContent).toEqual('Currently Open Restaurants ' + component.restaurants.length)

    const inputForm = component.postcodeInput.get('postcode');

    // submit new postcode
    spy = spyOn(component, 'onSubmit');
    inputForm?.setValue('ec4m'); // valid postcode
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toBe(1); // only one function call

    // check updated values
    fixture.detectChanges();
    expect(el.textContent).toEqual('Currently Open Restaurants ' + component.restaurants.length)

  }));


});
