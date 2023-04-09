import React from 'react';
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';
import router from './router';

import "./App.css";

function App() {
  return (
    <div className="app">
      <Helmet><link rel="icon" href="/favicon.ico"></link></Helmet>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
