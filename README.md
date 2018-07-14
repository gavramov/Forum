# Documentation
**React Forum** is a simple forum where you can make posts to a given category.
* Front-end - SPA (Single-Page-Application) using **ReactJS**
* Back-end - **Progress Kinvey** (https://progress.com/kinvey)

Users can register, login and logout in the forum app. Unauthenticated users can only view posts.
On the other hand, authenticated users can create, edit and delete their posts and comments.
Administrators can add, edit, delete categories, ban and unban users, and delete other users' posts and comments.
#App Build Setup
```
# install dependencies
1. npm install
# run project in dev
2. npm start
# navigate your browser to http://localhost:3000
```

# Functionality
3 types of roles - Guests, Authenticated Users (logged in), Administrators
```
Guests
    can see home page
    can register
    can login
    can view posts
```
```
Logged in Users
    all the guests' functionality
    can create posts
    can edit their posts
    can delete their posts
    can create comments on theirs and others' posts
    can edit their comments
    can delete their comments
```

```
Administrator:
    all the users' functionality
    can ban users
    can unban users
    can add categories
    can edit categories
    can delete categories
```

Posts have title, author, description, date created, views and comments.

Comments have description, date created, author

Banned users cannot create, edit, delete neither their posts nor their comments.
	
# Future Guidelines
	Replace Kinvey with express.js server + mongodb
	Users can change password
	Banned users cannot even log in (now can login, but cannot post and add comments)