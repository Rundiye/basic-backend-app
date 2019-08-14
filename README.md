# FINAL PROJECT



## Description

This is an app to keep the schedule of your trip organized by days and activities.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Landing Page:** As an anon I can have the option to go either to the signup page or login so that I can signup or login
-  **Signup:** As an anon I can sign up in the platform so that I can start organizing my next trip
-  **Login:** As a user I can login to the platform so that I can display and edit my dashboard and get inspired 
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Add Trip** As a user I can add a new trip
-  **Add Activity** As a user I can add a new activity to my trip
-  **Edit Activity** As a user I can edit a one activity
-  **Delete Activity** As a user I can delete a one activity
-  **Share Trip** As a user I can add friends to my trip, so that they can see the trip schedule
-  **Edit User Profile** As a user I can edit my profile and upload a picture of myself

-  **View Dashboard** As a user I want to see the trip dashboard so that I can have a big picture of the whole planning
-  **Homepage** As a user I can explore other user's recommendations about places where to go




## Backlog

User profile:
- Recive notifications when a friend gives feedback

Dashboard:
- Add comments section for friends to comment 
- Display activities in a map

Homepage:
- Add an Activity to the explore section
- Add activities from the explore section to my favorites
- Display activities in a map




# Client / Frontend

## Routes (React App)
| Path                      | Component            | Permissions | Behavior                                                     |
| ------------------------- | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                       | LandingPage           | public      | Home page                                        |
| `/auth/signup`            | SignupPage           | anon only   | Signup form, link to login, navigate to homepage after signup |
| `/auth/login`             | LoginPage            | anon only   | Login form, link to signup, navigate to homepage after login |
| `/auth/logout`            | n/a                  | anon only   | Navigate to Landing Page after logout, expire session            |
| `/profile`            | ProfilePage   | user only   | Shows profile information and the trips created by the user                              |
| `/newTrip`        | AddTripPage   | user only   | Add a trip                                           |
| `/trips/:id`        | TripDashboard | user only   | Details of a trip                               |    
| `/trips/:id/newActivity`         | n/a                   | user only   | Add activity 
| `/trips/:id/activity/:id/`         | n/a                   | user only   | Delete activity 
| `/trips/:id/activity/:id/edit`         | n/a                   | user only   | Edit activity
| `/trips/:id`         | n/a                   | user only   | delete Trip
 


## Components

- LandingPage

- LoginPage

- LandingPage

- HomePage 

- Profile (TripsListPage)

- Dashboard

- ActivityDetailPage

- Navbar

-Forms ***

 

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Trip Service
  - trip.list()
  - trip.detail(id)
  - trip.add(id)
  - trip.delete(id)
- Activity Service
  - activity.list()
  - activity.detail(id)
  - activity.add(id)
  - activity.delete(id)
  - activity.edit(id)





# Server / Backend


## Models

User model

```javascript
{
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  trips: [{type: Schema.Types.ObjectId,ref:'Trip'}],
  favorites: [{type: Schema.Types.ObjectId,ref:'Activity'}]
}
```



Activity model

```javascript
 {
   title: {type: String, required: true},
   activityType: {type: String, 
                  required: true,
                  Enum: ['Flight', 'Accomodation', 'Food', 'Cultural', 'Nightlife', 'others']
},
   description: {type: String},
   image: {type: String},
   adress: {type: String, required: true},
   price: {type: Number, required: true},
   date: {type: date, required: true},
  //  trip: { type: Schema.Types.ObjectId, ref: "Trip" }
 }
```


 Trip model

```javascript
{
  title: {type: String, required: true},
  description: String,
  destination: String,
  startDate: {type: Date, required: true},
  endDate: {type: Date,required: true},
  activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
  budget: {type: Number},
  owner: { type: Schema.Types.ObjectId, ref: "User" }
}
```





## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/profile    `           | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup`                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout`                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | `/trips`                |                              |                | 400          | Show all trips                                         |
| GET         | `/trips/:id`            | {id}                         |                |              | Show specific trip                                     |
| POST        | `/trips/addTrip` | {}                           | 201            | 400          | Create and save a new trip                             |
| DELETE      | `/trips/:id/delete`     | {id}                         | 201            | 400          | delete activity   
| POST        | `/trips/addTrip` | {}                           | 201            | 400          | Create and save a new trip                                           |
| PUT         | `/activity/addActivity`       | {title,image,description, price, address, type}           | 200            | 400          | create activity                                              |
| DELETE      | `/activity/:id/delete`     | {id}                         | 201            | 400          | delete activity                                            |




## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/nABuzycO/final-project) 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)


