import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import { IdContextProvider } from './context/EntityContext';
import MainPage from './pages/MainPage';
import Router from './shared/Router';

function App() {

  return (
    <IdContextProvider>
      <div className="App">
        <Header/>
        <div className="pageContent">
          <Navbar />
          <Router />
        </div>
      </div>
    </IdContextProvider>
  );
}

export default App;
