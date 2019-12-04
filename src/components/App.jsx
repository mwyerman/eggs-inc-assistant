import React from 'react';
import Header from './Nav';
import Main from './Main';
import Footer from './Footer';

const App = () => (
  <div className="flex-wrapper">
    <div>
      <Header />
      <Main />
    </div>
    <Footer />
  </div>
);

export default App;
