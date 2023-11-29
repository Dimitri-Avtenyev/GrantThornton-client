import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Uploadpage from './Components/Uploadpage/Uploadpage';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Uploadpage/>
      <Footer/>
    </div>
  );
}

export default App;
