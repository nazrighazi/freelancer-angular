# 🤖 Freelancer Hub

Connecting talented freelancers with clients in need of their services.

Demo link : https://justfortuto.shop

## Table of contents

- [Requirements](#requirements)
- [Project Description](#project-description)
- [Installation](#installation)
- [What's Inside](#whats-inside)
  - [What's Inside Src Folder](#whats-inside-1)
- [Configuration](#configuration)

## Project Description

### Stack Used In The Project

This project has been made using [Angular](https://angular.io/) and also [Tailwind](https://tailwindcss.com/). All the components are lazy loaded for best performance.

### Features

- https://justfortuto.shop/

  > homepage of the website. It displays the list of the freelancers.

- https://justfortuto.shop/freelancer/:id

  > specific freelancer page, which displays some information about them.

- https://justfortuto.shop/admin/login

  > login page for admin, before navigating to the admin dashboard
  > login using these creds:
  >
  > - username: admin1
  > - password: admin1234

- https://justfortuto.shop/admin/dashboard

  > admin dashboard, which displays all the freelancers. In here, they are able to
  >
  > 1. create new freelancer.
  > 2. update specific freelancer details.
  > 3. delete specific freelancer.

## Requirements

- code editor (etc, visual studio code)
- You must have node and npm installed (via brew install node or NodeJS.org);
  - recommended for node version 16.19.0

## Installation

```bash
$ cd [folder_name]
$ git clone https://github.com/nazrighazi/freelancer-angular.git
$ npm install or npm i
$ npm start
```

Then navigate your browser to http://localhost:4200

## Configuration

Do change your api url inside the environment file:

```dosini
# src/environments/environment.development

API_URL='[your_api_url'
```

## What's inside?<a id="whats-inside">

A quick look at the top-level files and directories in this project.

```shell
├── .angular
├── .vscode
├── src
├── .editorconfig
├── .gitignore
├── angular.json
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
```

## What's inside src/app? <a id="whats-inside-1">

A quick look at the top-level files and directories in this project.

```shell
├── client
	├── data access
	├── feature
	├── ui
	├── utils
├── public  # same structure as client
├── app-routing.module.ts
├── app.component.css
├── app.component.css
├── app.component.html
├── app.component.spec.ts
├── app.component.ts
├── app.module.ts
```

1. **`./client`** : folder for specific flow. There's tho flow in this project, which is client and public.

2. **`./data access`**: folder for files related with data fetching, such as services

3. **`./feature`**: folder for all the files related with the pages

4. **`./ui`**: dumb components

5. **`./utils`**: helper functions, such as guard and interceptor
