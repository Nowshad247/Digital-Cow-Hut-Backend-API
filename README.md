## #Application Routes:

## ##User

## -api/v1/auth/signup - DONE

## -api/v1/users (GET) - DONE

## -api/v1/users/{id} (GET) - DONE

## -api/v1/users/{id}(UPDATE) - DONE

## -api/v1/users/{id}(Delete) - DONE

## ##Cow

## -api/v1/cow(POST) - DONE

## -api/v1/cow(Get) - DONE

## -api/v1/cows/653def5b20206ad3eb6abba2 (Single GET) - GET - DONE

## -api/v1/cows/653def5b20206ad3eb6abba2 (Update ) - PATCH - DONE

## -api/v1/cows/653def5b20206ad3eb6abba2 (Delete ) - Deletenpm - DONE

## ##Pagination and Filtering routes of Cows

## -api/v1/cows?pag=1&limit=10 - DONE

## -api/v1/cows?sortBy=price&sortOrder=asc

## -api/v1/cows?minPrice=20000&maxPrice=70000

## -api/v1/cows?location=Chattogram

## -api/v1/cows?searchTerm=Cha

## ##Orders

## -api/v1/orders (POST)

-api/v1/orders (GET)

---

Create user Demo Data JSON :
{
"name": {
"firstName": "John",
"lastName": "Doe"
},
"password": "password123",
"role": "seller",
"phoneNumber": "111111111",
"address": "123 Main Street, City, Country",
"budget": 5000,
"income": 60000
}
