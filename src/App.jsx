import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './layout/Header';
import Dashboard from './routes/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
