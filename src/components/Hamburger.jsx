import React from 'react'
import styled from 'styled-components'
import {Grid, useTheme} from '@material-ui/core'
import _isEmpty from 'lodash/isEmpty'
import _get from 'lodash/get'
import {Link} from 'react-router-dom'

export const Hamburger = (props) => {
  const { rentData, sellData, handleClick } = props
  const rentalCategories = !_isEmpty(rentData, 'categories') && rentData.children
  const sellCategories = !_isEmpty(sellData, 'categories') && sellData.children

  return (
    <StyledHamburger theme={useTheme()}>
      <div>
        <div className='outer-menu'>
          <input className='checkbox-toggle' type='checkbox' id="checkbox-toggle" />
          <div className='hamburger'>
            <div />
          </div>
          <div className='menu'>
            <div>
              <Grid container spacing={1}>
                <Grid item xs={6} sm={6} md={6} xl={6}>
                  <ul>
                    <h3>RENT</h3>
                    {
                      !_isEmpty(rentalCategories) && rentalCategories.map((cat) => (
                        <li>
                          <Link to="/search" onClick={() => handleClick(cat)}>
                            <h6>{cat.name}</h6>
                          </Link>
                          {
                            _get(cat, 'children.length') > 0 &&
                            cat.children.map((category) => (
                              <div className='sub-category'>
                                <Link to="/search" onClick={() => handleClick(category, 'rent')}>
                                  {category.name}
                                </Link>
                              </div>
                            ))
                          }
                        </li>
                      ))
                    }
                  </ul>
                </Grid>
                <Grid item xs={6} sm={6} md={6} xl={6}>
                  <ul>
                    <h3>BUY</h3>
                    {
                      !_isEmpty(sellCategories) && sellCategories.map((cat) => (
                        <li>
                          <Link to="/search" onClick={() => handleClick(cat)}>
                            <h6>{cat.name}</h6>
                          </Link>
                          {
                            _get(cat, 'children.length') > 0 &&
                            cat.children.map((category) => (
                              <div className='sub-category'>
                                <Link to="/search" onClick={() => handleClick(category, 'sell')}>
                                  {category.name}
                                </Link>
                              </div>
                            ))
                          }
                        </li>
                      ))
                    }
                  </ul>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </StyledHamburger>
  )
}

const StyledHamburger = styled.div`
.flex-center {
  display: flex;
  justify-content: center;
}
a,
a:visited,
a:hover,
a:active {
  color: inherit;
}
.outer-menu {
  position: fixed;
  top: 10vh;
  left: 0;
  z-index: 1;
}
.outer-menu .checkbox-toggle {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  width: 60px;
  height: 60px;
  opacity: 0;
}
.outer-menu .checkbox-toggle:checked + .hamburger > div {
  -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
}
.outer-menu .checkbox-toggle:checked + .hamburger > div:before,
.outer-menu .checkbox-toggle:checked + .hamburger > div:after {
  top: 0;
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}
.outer-menu .checkbox-toggle:checked + .hamburger > div:after {
  opacity: 0;
}
.outer-menu .checkbox-toggle:checked ~ .menu {
  pointer-events: auto;
  visibility: visible;
}
.outer-menu .checkbox-toggle:checked ~ .menu > div {
  -webkit-transform: scale(1);
          transform: scale(1);
  -webkit-transition-duration: 0.75s;
          transition-duration: 0.75s;
}

.outer-menu .checkbox-toggle:hover + .hamburger {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
}
.outer-menu .checkbox-toggle:checked:hover + .hamburger > div {
  -webkit-transform: rotate(225deg);
          transform: rotate(225deg);
}
.outer-menu .hamburger {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 3rem;
  height: 3rem;
  padding: 0.5em 1em;
  background: #f5f7f7f7;
  border-radius: 0 0.12em 0.12em 0;
  cursor: pointer;
  -webkit-transition: box-shadow 0.4s ease;
  transition: box-shadow 0.4s ease;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
}
.outer-menu .hamburger > div {
  position: relative;
  -webkit-box-flex: 0;
          flex: none;
  width: 100%;
  height: 2px;
  background: #FEFEFE;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
          align-items: center;
  -webkit-box-pack: center;
          justify-content: center;
}
.outer-menu .hamburger > div:before,
.outer-menu .hamburger > div:after {
  content: '';
  position: absolute;
  z-index: 1;
  top: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background: inherit;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.outer-menu .hamburger > div:after {
  top: 10px;
}
.outer-menu .menu {
  position: fixed;
  top: 0;
  height: -webkit-fill-available;
  visibility: hidden;
}
.outer-menu .menu > div {
  width: 100vw;
 overflow: auto;
    height: -webkit-fill-available;
  color: #FEFEFE;
  background: #8c450b;
  transition: all 0.4s ease;
  display: -webkit-box;
  webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    -webkit-box-flex: 0;
    flex: none;
     -webkit-transform: scale(0); 
     transform: scale(0); 
    -webkit-backface-visibility: hidden;
     backface-visibility: hidden;
  justify-content: center;
}
ul{
list-style-type: none;
}
.outer-menu .menu > div > div > div > ul > li {
 padding: 0;
 margin: 1em;
}
.sub-category{
display: flex;
}
h6{
display: flex;
}
h3{
  display:inline-block;
  margin-left:15px;
}
h4{
text-decoration: underline;
}
.MuiGrid-container{
width:80%
}
`
