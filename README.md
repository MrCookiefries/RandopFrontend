# Randop (Frontend)

Deployed [here on surge][surge]

An online shop of random goods!

_This is just the **React** frontend, the main project & backend can be found at [this repository][backend]_.

---

## Setup

### Requirements

This is only the frontend, it relies on the backend server to run properly. You'll need to follow the steps documented on [this repository][backend]. After that, follow along with these steps.

- Clone of this GitHub repository

  - [Guide][clonedocs] on their docs of how to

Everything else like Node (NPM) will already be installed from the setup of the backend.

### Post Installment

1. Change into the root directory of the cloned repository

   ```bash
   cd ./RandopFrontend # or whatever you named it
   ```

1. Run the npm command to install the dependencies from `package.json`

   ```bash
   npm i
   ```

### Running the code

All these actions should be performed from the root directory of the project. The backend should also be up and running

#### Production build

- Run the command

  ```bash
  npm run build
  ```

#### Development mode

- Run the command

  ```bash
  npm run start
  ```

#### Testing mode

- Run the command

  ```bash
  npm run test
  ```

## Usage

### Accounts

Users can create, log in, and logout of an account. Accounts are needed for some functionalities of the site. So that your information can be saved for you, such as the shopping carts you make.

### Products

Anyone can view the products that I have in the DB. To be able to add products to a shopping cart, you have to be logged in though. Only admins are able to create new products, edit existing ones, or delete ones.

### Carts

Only users can view their shopping carts, create new ones, and delete them if they wish. In addition to that, when their cart is ready, they're able to check it out.

### Checkout

Users can checkout their shopping carts, to confirm payment on the items they have.

_After checkout, the cart will automatically be deleted, but the information will not be lost. See below_

### Orders

Upon checkout, the cart data will be moved into an orders table, where it's kept as a log of pending orders. Each one includes an additional timestamp of when the order was placed. Only admins are able view the orders.

## Technology & Tools used

- Node.js (JS runtime environment)

- React (JS framework for web components)

- Material UI (React library for styled components)

- React Stripe (Premade secure payment compenets)

- Stripe JS (Submitting payments to Stripe)

- Jest, React Testing Library, Jest DOM (Code tests)

- Axios (AJAX requests)

- Formik (Form validation)

- JSON Web Token (Authentification)

- PapaParse (JSON to CSV conversion)

- React Redux (Store management for state of app)

- React Router (Client side routing / Single Page App)

- Redux Thunk (Async middleware for dispatched store actions)

- SASS / SCSS (Additional styling of components)

- Yup (Data validation schema for Formik)

## Creation

Before any code began, I created a wireframe of the design I wanted for the site to have.

After that, I started off by using the default Create React App template. Then configured it to use Redux, Redux Thunk, & React Router, so that I could begin more work. Creating the basic routes for the app, and then setting up the store for the data they'd need.

The store was in general a three step process. Making action types, action creators (plus thunk action creators), and reducers. As time went on, I added more and more to the store, adding what I needed for whichever part of the site I was working on currently.

Early on I made many helper functions, to eradicate duplicated logic. The goal was for each file to be single action focused, and slim.

When I began to need forms to collect data, I brought in Formik + Yup, to validate the data on the frontend before sending it off to the backend to once again be validated. The extra validation isn't wasted, on the frontend, the underlying HTML can be changed to bypass the frontend validation. It's only real goal is to save extra requests going to the backend to just come back and say that the data isn't valid.

Using the power of React Router, I was able to create protected routes, for logged in users, and admin users. Even if someone was able to bypass that, the server still would not accept their requests, because of their JWT, so they'd not be able to see anything still or have free power.

For submitting payments, I'm using Stripe, and it's in test mode. Provided on the frontend is a list of sample test payment information, so that you can try it out. Thanks to their pre-built payment collection information, all the card information taken is secure, never saved on the frontend, or sent to the backend, only to Stripe itself in a secure fashion.

When you're logged in, you'll become a Stripe customer automatically through the backend. As for payment amounts when checking out a cart. The backend calculates the amount, and creates a payment intent for that user with that amount to charge. The frontend then recieves that, and uses it to confirm the payment after the payment method information is collected.

[backend]: https://github.com/MrCookiefries/Randop
[clonedocs]: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
[surge]: https://randop.surge.sh/
