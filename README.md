# Next To Go

Next To Go is a modern web application built with Vue 3 and Vite, designed to display and filter upcoming racing events.

## Features

-   **Live Next To Go Races:** View a list of upcoming races with real-time updates.
-   **Category Filtering:** Filter races by racing categories (e.g., horse, greyhound, harness).

## Project Structure

```
src/
  App.vue                  # Main application component
  main.js                  # App entry point
  style.css                # Global styles (Tailwind CSS)
  components/              # Shared UI components
    FilterOptions.vue      # Category filter UI
    __tests__/
      FilterOptions.test.js
  consts/
    consts.racingCategories.js # Racing category constants
  features/
    nextToGo/              # Next To Go feature module
      NextToGoView.vue     # Main view for Next To Go
      apis/
        api.nextToGo.js    # API definitions for Next To Go view
      components/
        NextToGoRaceList.vue   # Race list display
        __tests__/
          NextToGoRaceList.test.js
  utils/
    apiHandler.js          # Generic API handler
public/
  vite.svg                 # Static asset
vite.config.js             # Vite configuration
vitest.config.js           # Vitest configuration
eslint.config.js           # ESLint configuration
index.html                 # HTML entry point
package.json               # Project metadata and scripts
```

## Getting Started

-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/j4mesanthony/next-to-go.git
    cd next-to-go
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

### Running the Application

To start the development server with hot module reloading:

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Building for Production

To build the app for production:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

### Testing

This project uses [Vue Test Utils](https://test-utils.vuejs.org/) and [Vitest](https://vitest.dev/) for testing.

To run all tests:

```sh
npm run test
```

### Linting

This project uses [ESLint](https://eslint.org/) for code linting.

To check for linting errors, run:

```sh
npm run lint
```

#### ESLint Configuration

-   ESLint is configured using the `eslint.config.js` file with support for JavaScript and Vue files.
-   Uses the recommended rules from `@eslint/js` and `eslint-plugin-vue`.

---

_Made with [Vue 3](https://vuejs.org/) and [Vite](https://vitejs.dev/)._
