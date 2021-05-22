# Get Booked! [Frontend]

![GetBooked Logo](./src/assets/getbooked_logo.png)

Greetings! If you're reading this, you're either the future maintainer of this project or an interested party wondering why NUSMS has a GitHub account. Either way, welcome :)

This is my first time actually leaving a project behind in hopes that someone picks it up so do forgive me for any shortcomings.

## Project setup ⚙

I've opted to use yarn here but you may use npm if you prefer. The following command installs the node_modules/dependencies required in this project.

```
yarn install
```

### Environment Variables

Copy the .sample.env file and rename it as .env. Add in the required variables and the dotenv-webpack dev-dependency will take care of the rest.

```
cp .sample.env .env
```

### Compiles and hot-reloads for development

Netlify lambda is used for local development. Use two separate terminals to run these two lines of code.

```
yarn serve // Deploys the Vue Single Page Application (SPA)
yarn serve-fn // Deploys the netlify-functions that run server-side
```

### Compiles netlify functions for deployment [❗❗❗]

Unless you are deploying (i.e. pushing to the master branch of the remote repo to make your changes go live), do not commit any of the lambda Javascript files (googleapi.js). **Before committing, make sure to run the following code first!** This is important as your locally compiled code will contain all the secret keys and if it is in the commit tree when pushed to the repo, all our secrets will be accessible to the public. In hindsight, I probably should have made this a deployment build rather than a local build process so this won't ever happen.

```
yarn build-fn
```

### Editor

I use eslint/prettier so please also use it.

## Technologies/Frameworks/Services 👨‍💻

This project is divided into two main segments. This repository contains the code responsible for displaying the frontend (website) of the Get Booked! Initiative. The "backend", or the code responsible for handling Telegram interactions, can be found on the **Google Apps Script** Editor of the Google Sheet associated with this initiative (access is restricted).

The frontend is deployed on **Netlify**, with **Vue 2.0** as the frontend framework and **Typescript** as the main programming language. As I had never really written vanilla css before, I opted to use it in this project instead of sass, for learning purposes. Thus far, I have learnt that vanilla css is painful and we should all really just use a preprocessor to make our lives easier.

Dependencies are also kept to a minimum, again mostly for learning purposes (but also so things won't randomly break), with only Lodash's debounce and vuex-persistedState used.

For the database/data storage, we've used **Google Sheets** as it was free but also because it allows non-coders to easily modify most of the static content present and manage the data whenever necessary.
