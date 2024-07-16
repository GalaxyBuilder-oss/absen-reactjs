# Web Application Documentation

## Overview

This web application is designed to manage and display data related to dormitories and prayer times. It includes several key features, such as data fetching, filtering, and offline status handling. The app is built using React and leverages various libraries and tools to enhance its functionality.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Components](#components)
3. [State Management](#state-management)
4. [Data Fetching](#data-fetching)
5. [Event Handling](#event-handling)
6. [Offline Handling](#offline-handling)
7. [Environment Variables](#environment-variables)
8. [Dependencies](#dependencies)

## Project Structure

```
src/
├── components/
│   ├── NavigationBar.js
│   ├── Footer.js
├── utils/
│   └── db/
│       └── connect.js
├── App.js
└── index.js
```

## Components

### NavigationBar

The `NavigationBar` component is responsible for rendering the navigation bar at the top of the application. It provides options for fetching data, managing the menu state, and checking if the user is an admin.

### Footer

The `Footer` component renders the footer section of the application.

## State Management

The application uses React's `useState` and `useEffect` hooks for state management.

### States

- `data`: Stores the fetched data.
- `histories`: Stores the fetched history data.
- `date`, `month`, `year`: Stores the current date, month, and year.
- `filteredData`: Stores the filtered data based on the selected dormitory.
- `menu`: Stores the current menu state.
- `showIsAdmin`: Boolean to check if the user is an admin.
- `isLoading`: Boolean to manage loading state.
- `selectedPrayerTime`: Stores the selected prayer time.
- `dormitory`: Stores the selected dormitory.
- `isOnline`: Boolean to check if the application is online or offline.

## Data Fetching

Data fetching is handled by two main functions: `fetchData` and `fecthDataHistory`.

### fetchData

Fetches the main data using the `getData` function from `./utils/db/connect`.

```javascript
const fetchData = () => {
  setIsLoading(true);
  getData()
    .then((response) => {
      if (response.hasChildren()) {
        setData(response.val());
        setIsLoading(false);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
```

### fecthDataHistory

Fetches the historical data based on the selected dormitory, prayer time, year, month, and date.

```javascript
const fecthDataHistory = async () => {
  setIsLoading(true);
  await getHistory(
    encodeURIComponent(dormitory),
    selectedPrayerTime,
    year,
    month,
    date
  )
    .then((data) => {
      setHistories(data.val());
      setIsLoading(false);
    })
    .catch((e) => console.error(e));
};
```

## Event Handling

### handlePrayerTime

Handles the selection of prayer time.

```javascript
const handlePrayerTime = (time) => {
  setSelectedPrayerTime(time.target.value);
};
```

## Offline Handling

The application handles offline status using the `navigator.onLine` property and `window` event listeners.

```javascript
const [isOnline, setIsOnline] = useState(navigator.onLine);

useEffect(() => {
  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);
```

## Environment Variables

The application uses environment variables to set the document title.

```javascript
document.title = import.meta.env.VITE_APP_NAME;
```

## Dependencies And Development Dependencies

The application uses the following dependencies:

### Dependencies

- **@tailwindcss/forms:** ^0.5.7  
  Tailwind CSS plugin for styling forms.
  
- **@tailwindcss/typography:** ^0.5.13  
  Tailwind CSS plugin for styling typography.
  
- **dotenv:** ^16.4.5  
  Loads environment variables from a `.env` file into `process.env`.
  
- **dotenv-expand:** ^11.0.6  
  Expands environment variables for `dotenv`.
  
- **firebase:** ^10.12.3  
  Firebase SDK for integrating Firebase services in the application.
  
- **firebase-tools:** ^13.13.2  
  Command-line tools for Firebase.
  
- **js-cookie:** ^3.0.5  
  Library for handling cookies in the browser.
  
- **lucide-react:** ^0.400.0  
  SVG icon component library for React.
  
- **moment:** ^2.30.1  
  Library for parsing, validating, manipulating, and formatting dates.
  
- **prop-types:** ^15.8.1  
  Runtime type checking for React props.
  
- **react:** ^18.3.1  
  Library for building user interfaces in React applications.
  
- **react-dom:** ^18.3.1  
  DOM entry point for React applications.
  
- **react-router-dom:** ^6.24.1  
  Library for declarative routing in React applications.
  
- **react-toastify:** ^10.0.5  
  Library for displaying notifications in React applications.
  
- **uuid:** ^9.0.1  
  Library for generating and working with UUIDs.

### Development Dependencies

- **@types/react:** ^18.3.3  
  TypeScript type definitions for React.
  
- **@types/react-dom:** ^18.3.0  
  TypeScript type definitions for ReactDOM.
  
- **@vitejs/plugin-react:** ^4.3.1  
  Vite plugin for React support.
  
- **autoprefixer:** ^10.4.19  
  PostCSS plugin to parse CSS and add vendor prefixes.
  
- **eslint:** ^8.57.0  
  JavaScript linter.
  
- **eslint-plugin-react:** ^7.34.4  
  ESLint plugin for React-specific linting rules.
  
- **eslint-plugin-react-hooks:** ^4.6.2  
  ESLint plugin for React hooks rules.
  
- **eslint-plugin-react-refresh:** ^0.4.8  
  ESLint plugin for React Refresh rules.
  
- **postcss:** ^8.4.39  
  Tool for transforming CSS with JavaScript plugins.
  
- **tailwindcss:** ^3.4.4  
  Utility-first CSS framework for rapidly building custom designs.
  
- **vite:** ^5.3.3  
  Next-generation frontend tooling for modern web development.


```json
{
  "dependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.13",
    "dotenv": "^16.4.5",
    "dotenv-expand": "^11.0.6",
    "firebase": "^10.12.3",
    "firebase-tools": "^13.13.2",
    "js-cookie": "^3.0.5",
    "lucide-react": "^0.400.0",
    "moment": "^2.30.1",
    "prop-types": "^15.8.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.24.1",
    "react-toastify": "^10.0.5",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.4",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.8",
    "postcss": "^8.4.39",
    "tailwindcss": "^3.4.4",
    "vite": "^5.3.3"
  }
}
```

## Usage

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the application:**
   ```sh
   pnpm start
   ```

This will start the development server and open the application in your default web browser.

## Conclusion

This web application is designed to manage dormitory data and prayer times, providing a user-friendly interface for administrators and users. The app is structured to handle data fetching, offline status, and state management efficiently.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
