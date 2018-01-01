import React from 'react';
import classNames from 'classnames';

const Navigation = () => {
  const navClasses = classNames('navigation');

  return (
    <nav className={navClasses}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/resume">Resume</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
