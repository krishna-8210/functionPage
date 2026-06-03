import React from 'react';

const Layout = ({ children, actions }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1 className="layout-title">Snippet Manager</h1>
        <div className="layout-actions">{actions}</div>
      </header>
      <main className="layout-main">{children}</main>
      <footer className="layout-footer">
        <p>&copy; {new Date().getFullYear()} Snippet Manager</p>
      </footer>
    </div>
  );
};

export default Layout;