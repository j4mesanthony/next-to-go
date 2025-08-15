# Next To Go

Next To Go is a modern web application built with Vue 3 and Vite, designed to display and filter upcoming racing events. It features a clean UI, fast performance, and a modular codebase for easy maintenance and extension.

## Features

-   **Live Next To Go Races:** View a list of upcoming races with real-time updates.
-   **Category Filtering:** Filter races by racing categories (e.g., thoroughbred, harness, greyhound).
-   **Responsive UI:** Built with Tailwind CSS for a mobile-friendly experience.
-   **Modular Architecture:** Organized with Vue components, composables, and feature-based folders.

## Project Structure

```
src/
	App.vue                # Main application component
	main.js                # App entry point
	style.css              # Global styles (Tailwind CSS)
	components/            # Shared UI components
		FilterOptions.vue    # Category filter UI
		consts/              # Constants (e.g., racing categories)
		features/
			nextToGo/          # Next To Go feature module
				NextToGoView.vue # Main view
				apis/            # API definitions
				components/      # Feature-specific components
				composables/     # Feature-specific composables
				models/          # Data models
	utils/                 # Shared utilities
		apiHandler.js        # Generic API handler
public/                  # Static assets
vite.config.js           # Vite configuration
package.json             # Project metadata and scripts
```

## Getting Started

### Prerequisites

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

This project uses [Vitest](https://vitest.dev/) for unit testing.

To run all tests:

```sh
npm run test
```

or

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
