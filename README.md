# React Vite Project

Welcome to the **React Vite Project** repository! This project is built using React and Vite, optimized for performance and fast development. The project is configured to run with **Node.js version 18**.
For simplicity, this project is purely made with React, and CSS is used for styling.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
    ```bash
   git clone git@github.com:mayank9650/E-Commerce.git
   cd E-commerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified in the terminal).



---

## Folder Structure

```
project-root/
├── public/            # Static assets (e.g., images, fonts)
├── src/
│   ├── assets/        # Project-specific assets
│   ├── components/    # React components
│   ├── pages/         # Page components for routing
│   ├── App.jsx        # Root component
│   ├── main.jsx       # Entry point
│   ├── utils/	       # Reusable react components
├── package.json       # Project metadata and dependencies
├── vite.config.js     # Vite configuration
```

---

## Code Patterns

    1.Atomic design pattern for code structure
    2.Container-Presenter pattern
    3.Render prop pattern

## Optimization and design

    1.Custom hooks for reusable
    2.Infinite scrolling for dynmaic data
    3.React Portals used for modal
    4.Smooth behaviour while images are loading

## Limitations and enhancements

    1.Api not supporting page based results, can only provide the limit.
    2.Centralized store for storing the data(Context, Redux) when application grows.
