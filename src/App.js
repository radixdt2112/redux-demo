import React from 'react';
import logo from './logo.svg';

import './App.css';

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Home } from './pages/Home';
import { User } from './features/user/user';
// import { PDFViewer } from '@react-pdf/renderer';
// import { Pdfexample } from './pages/pdfexample';
function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" height="100px" width="100px" />
        {/* <PDFViewer>
          <Pdfexample />
        </PDFViewer> */}
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
