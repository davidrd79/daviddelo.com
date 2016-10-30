import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import styles from './styles.scss';

const Navigation = () => {
  const navClasses = classNames('navigation');

  return (
    <nav className={navClasses}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
