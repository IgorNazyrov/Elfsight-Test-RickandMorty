import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { DataProvider } from './components';
import './index.css';
import { FilterProvider } from './components/providers/FilterProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/Elfsight-Test-RickandMorty">
      <DataProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
