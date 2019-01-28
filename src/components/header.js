import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'

const HeaderWrapper = styled.header`
  grid-area: Header;
  width: 100%;
  z-index: 12;
`

const MenuButton = styled.button`
  /* position: fixed; */
  z-index: 100;
`

const HeaderContainer = styled.div`
  background-color: transparent;
  max-width: 100%;
  padding: 1.5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 1fr;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-size: 1rem;
  button {
    justify-self: start;
    margin: 0;
    padding: 0;
    color: #797979;
    font-weight: 400;
    background: none;
    border: none;
    outline: none;
    &:hover {
      color: salmon;
    }
  }
  h1 {
    justify-self: end;
    margin: 0;
    padding: 0;
    color: #797979;
    font-weight: 400;
    font-size: 1rem;
    a {
      color: inherit;
      text-decoration: none;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-size: inherit;
      white-space: nowrap;
    }
    &:hover {
      color: salmon !important;
    }
  }
`

const Header = ({ siteTitle, open, click, style }) => (
  <HeaderWrapper style={style}>
    <HeaderContainer>
      <MenuButton onClick={click}>{!open ? 'menu' : 'close'}</MenuButton>
      <div />
      <h1>{!open && <Link to="/">{siteTitle}</Link>}</h1>
    </HeaderContainer>
  </HeaderWrapper>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
