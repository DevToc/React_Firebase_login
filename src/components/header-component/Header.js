import React from 'react';
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

export const Header = ({ title = "" }) => {
  return (
    <header>
      <div className="header-container">
        <Container className="header">
          <div className="header-title">
            {title}
          </div>
          <div className="icon-header">
            <Link to="/">
              <HomeIcon style={{ color: 'white' }} />
            </Link>
          </div>
        </Container>
      </div>
    </header>
  )
}