import React from 'react';

function Footer() {
  return (
    <div className="container-fluid bg-dark" align="center">
      <span className="text-muted">
        Copyright &copy;
        {new Date().getFullYear()}
        <a className="text-muted" href="https://github.com/mwyerman"> mwyerman </a>
      </span>
    </div>
  );
}

export default Footer;
