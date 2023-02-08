export interface IRestaurant {
    Name: string,
    Rating: IRestaurantRating,
    IsOpenNow: boolean
    Cuisines: IRestaurantCuisine[]
}

export interface IRestaurantRating {
    Count: number,
    Average: number,
    StarRating: number
}

export interface IRestaurantCuisine {
    Name: string
}