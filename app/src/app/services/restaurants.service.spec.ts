import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(RestaurantsService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
});
