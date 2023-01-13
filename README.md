# MyMDb

## Overview
This project is basically my version of Letterboxd for TV. I am going to use Ionic, Vue, and Capacitor. To make an App that can log movies and TV shows. I understand apps like TV Time and Serializd exist but I think it will be a fun personal project and give me more web experience with mobile first design and mobile app development. 

# Domain Driven Design

## Events
* User creates account 
* User logged in
* User logged out
* User deletes account
* Search for TV show
* Request information about TV show
* Mark TV show as watched
* Mark TV season as watched
* Mark TV episode as watched
* Put TV show in watch list
* Remove TV show from watch list 
* Make a list of TV shows
* Make a list of TV Seasons
* Make a list of TV Episodes
* Make a review for TV show
* Make a review for TV Season
* Make a review for TV Episode 
* Make review private 
* Make review public
* Follow User Content
* Search for other users on app
* View user profile

## Entities 

User 
| Property     | Type          |
|--------------|---------------|
| _id          | ObjectId      |
| username     | String        |
| profilePhoto | String        |
| password     | String HASHED |
| loggedIn     | Boolean       |

Media
| Property     | Type                                                                                                                                           |
|--------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| _id          | ObjectId                                                                                                                                       |
| tmdbId       | String                                                                                                                                         |
| type         | String ["Movie", "Short Film", "TV Series", "TV Season", "TV Episode", ...]                                                                    |
| score        | Number                                                                                                                                         |
| Times Logged | Number                                                                                                                                         |
| ratings      | Object  ``` {  1: Number,   2: Number,  3: Number,  4: Number,  5: Number,  6: Number,  7: Number,  8: Number,   9: Number,  10: Number, } ``` |
|              |                                                                                                            

MediaInteraction
| Property      | Type     |
|---------------|----------|
| _id           | ObjectId |
| tmdbId        | String   |
| movieId       | ObjectId |
| userId        | ObjectId |
| Times Watched | Number   |
| rating        | Number   |
| Liked         | Boolean  |

Log
| Property   | Type       |
|------------|------------|
| _id        | ObjectId   |
| tmdbId     | String     |
| movieId    | ObjectId   |
| userId     | ObjectId   |
| rating     | Number     |
| Liked      | Boolean    |
| Tags       | [ObjectId] |
| isReview   | boolean    |
| reviewText | String     |
| watchedAt  | TimeStamp  |
| isRewatch  | Boolean    |
| isPrivate  | Boolean    |
| noteText   | String     |
| createdAt  | TimeStamp  |
| updatedAt  | TimeStamp  |
| containsSpoilers | Boolean |
| comments | [ {user: ObjectId, text: String}] |
