import React from 'react';
import Header from './components/header'; 
import Hero from './components/Hero';
import Features from './components/Features';
function App(){
  return(
    <div className="App">
      //Pour appeller le composant Header 
       <Header />
       <Hero />
       <Features />
    </div>
  ); 
}

export default App;