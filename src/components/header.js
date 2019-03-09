import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { rhythm } from '../utils/typography'

const HeaderWrapper = styled.header`
  grid-area: Header;
  width: 100%;
  z-index: 12;
`

const MenuButton = styled.button`
  z-index: 100;
`

const HeaderContainer = styled.div`
  background-color: transparent;
  max-width: 100%;
  padding: 1.5rem;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 6fr 1fr;

  button {
    justify-self: start;
    margin: 0;
    padding: 0;

    font-size: ${rhythm(0.8)};
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
    font-size: ${rhythm(0.8)};
    line-height: 0;
    a {
      color: inherit;
      text-decoration: none;
      white-space: nowrap;
    }
    &:hover {
      color: ${props => props.theme.Hover} !important;
    }
  }
`

const Header = ({ siteTitle, open, click, style }) => (
  <HeaderWrapper style={style}>
    <HeaderContainer>
      <MenuButton onClick={click}>{!open ? 'menu' : 'close'}</MenuButton>
      <div />
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
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
