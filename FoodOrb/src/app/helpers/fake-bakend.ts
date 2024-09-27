import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

let orders = JSON.parse(localStorage.getItem('orders')) || [];
const feedItems=[{
    "feedId": 1,
    "restaurant": "al bek",
    "dishName": "Alfaham Chicken",
    "description": "Lebaneese style restaurant",
    "rating": 4.5,
    "cost": 190,
    "imageUrl": "data:image/jpeg;base64,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"
}, {
    "feedId": 2,
    "restaurant": "al arabia",
    "dishName": "Chicken Shawarma",
    "description": "Lebaneese style restaurant",
    "rating": 4.8,
    "cost": 250,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 3,
    "restaurant": "Home kitchen services",
    "dishName": "mix non veg noodles",
    "description": "Chinese restaurant",
    "rating": 3.9,
    "cost": 175,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 4,
    "restaurant": "Hotel Shalimar",
    "dishName": "Chicken fried rice",
    "description": "Chinese restaurant",
    "rating": 4.6,
    "cost": 210,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 5,
    "restaurant": "King Fried Chicken",
    "dishName": "KFC Chcken bucket",
    "description": "American restaurant",
    "rating": 4.1,
    "cost": 499,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 6,
    "restaurant": "McDonalds",
    "dishName": "Cheese Burger with Fries",
    "description": "American restaurant",
    "rating": 4.1,
    "cost": 399,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 7,
    "restaurant": "Beijing bites",
    "dishName": "Beef lo mein",
    "description": "Chinese restaurant",
    "rating": 4.9,
    "cost": 400,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 8,
    "restaurant": "Main land China",
    "dishName": "Veg Momos",
    "description": "Chinese restaurant",
    "rating": 3.2,
    "cost": 120,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 9,
    "restaurant": "Kabablo",
    "dishName": "Cajun spiced chicken",
    "description": "Indian restaurant",
    "rating": 4.6,
    "cost": 220,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}, {
    "feedId": 10,
    "restaurant": "Raddys biriyani zone",
    "dishName": "Roasted Chicken biriyani",
    "description": "Indian restaurant",
    "rating": 4.5,
    "cost": 190,
    "imageUrl": "http://dummyimage.com/128x100.png/ff4444/ffffff"
}];
let feeds = localStorage.setItem('feed',JSON.stringify(feedItems));

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/feed') && method === 'GET':
                     return getAllFoodItems();
                case url.endsWith('/users/validateEmail') && method === 'POST':
                    return validateEmail();
                case url.endsWith('/cart/orders') && method === 'GET':
                    return getAllOrders();
                case url.endsWith('/cart/placeOrder') && method === 'POST':
                    return placeOrder();
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: 'fake-jwt-token'
            })
        }

        function validateEmail() {
            const { email } = body;
            const user = users.find(x => x.email === email);
            if (!user) return error('Email not found registered');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: 'fake-jwt-token'
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function placeOrder() {
            orders.push({ id: Math.random(), placedOrder:body});
            localStorage.setItem('orders', JSON.stringify(orders));
            return ok();
        }
        

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getAllFoodItems() {
            if (!isLoggedIn()) return unauthorized();
            return ok(JSON.parse(localStorage.getItem('feed')) || []);
        }
        function getAllOrders() {
            if (!isLoggedIn()) return unauthorized();
            return ok(JSON.parse(localStorage.getItem('orders')) || []);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};