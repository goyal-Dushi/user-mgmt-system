# Welcome All

## Overview

This is a full stack web appliation that mimics the behaviour of a user management system

## Table of Contents

- [Description](##description)
- [Usage & Installation](##usage-&-installation)
- [Contribution Guidelines](##contribution-guidelines)

## Description

In this project, the users are distinguished based on their role, i.e either they are admin or they are normal users.

- **Admin** : has access to all the users registerd. He/she can edit/delete the users, along with their own details.
- **User**: by default, the site registers the person as a normal user, having access to only his/her own profile and able to edit their own details

There is authentication based on their `Email id's` & `Password`, after verification, only then user can proceed further
For the time being , Admin access can be granted to user by making changes by directly accessing the database. No functionality has
been added in the frontend to enable users to decide their roles.

## Usage & Installation

The root dir of the project contains the backend made with Node & express. The frontend is inside the client dir.

### Once you download or clone the project to you local repo.You will have separate package.json files for both frontend (inside client dir) & backend , in the root of the project

- Hit `npm install` for each dir (root & client) to install the dependencies for backend and frontend
- Run `node index.js or nodemon index.js` to run the backend
- To run the React frontend , go to client dir and run `npm start`

You will be redirected to the `localhost:3000` as soon as you run the client.

### **Note** : When running the backend , you should see `Server started at 5000 & Database connection successful` ensuring that your backend server has successfully started and MongoDB database connection has been established

### **Note** : You need to have _mongo_ installed on you computer to be able to run the project. If not , install from [here](https://docs.mongodb.com/manual/installation/)

## Contribution Guidelines

- Please wait for the issue to be assigned before addressing any
- Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
- `no PR accepted on main/master branch ` ensure to make separate branch while working on any issue
