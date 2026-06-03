import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SnippetPage from './pages/SnippetPage';
import Layout from './layout/Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<SnippetPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;