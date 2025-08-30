# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

```
frontend/
│
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, logos, icons
│   ├── components/       # Reusable UI components
│   ├── pages/            # App pages (Home, Login, Dashboard etc.)
│   ├── routes/           # Routing setup
│   ├── store/            # State management (Redux/Zustand/Context)
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry file
│   └── index.css
│
├── .env.example          # Sample environment variables
├── package.json
├── tailwind.config.js
└── README.md
```