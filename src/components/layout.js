import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import './layout.css'
import styled, { ThemeProvider, InjectGlobal } from 'styled-components'
import { Transition, Spring, config } from 'react-spring/renderprops'
import { rhythm } from '../utils/typography'

import Nav from './nav'
import Header from './header'

// ${props => props.theme.maxWidth};
const theme = {
  Hover: '#FFC199', //'#FFE2D9', //'#FFBCA6',
  BgOpenMenu: '#A4B5CC',
  BgDarkSky: '#4D6E99',
  BgLightSky: '#99FBFF', //'#99FBFF' '#E6FEFF', #80E8CF, #8DFFC3, #80C9E8, #8DBEFF, #FFB3E5, #263F40
  BgGray: '#e8eeef',
  Color: '#8a97a0', //color: #797979;
  MaxWidth: '1000px',
}

const LayoutWrapper = styled.div`
  /* grid-gap: 20px; */

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 120px auto 120px;
  grid-template-rows: 50px auto 50px;
  grid-template-areas:
    'Header  Header  Header'
    'Main Main Main'
    'Footer  Footer  Footer';
  .grey {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 0;
  }
`
const MainLayout = styled.main`
  grid-area: Main;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  text-align: center;
  background: none;
  margin: 0 auto;
  display: grid;
  align-items: center;
`

const Footer = styled.footer`
  grid-area: Footer;
  width: 100%;
  margin: 0;
  text-align: center;
  color: ${props => props.theme.Color};
`

class Layout extends Component {
  state = { toggleNav: undefined }
  handleClick = e => {
    this.setState({ toggleNav: !this.state.toggleNav })
  }
  render() {
    const { children } = this.props
    const { toggleNav } = this.state
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <Spring
              config={{ duration: 200 }}
              immediate={this.state.toggleNav === undefined}
              from={{
                backgroundColor: toggleNav ? '#fff' : '#fff',
              }}
              to={{
                backgroundColor: toggleNav ? '#fff' : '#fff',
              }}
            >
              {styles => (
                <LayoutWrapper>
                  {/* <div className="grey" style={styles} /> */}
                  <Header
                    click={this.handleClick}
                    open={toggleNav}
                    siteTitle={data.site.siteMetadata.title}
                  />

                  <Transition
                    items={this.state.toggleNav}
                    from={{ transform: 'translate3d(-100%,0,0)' }}
                    enter={{ transform: 'translate3d(0%,0,0)' }}
                    leave={{ transform: 'translate3d(-100%,0,0)' }}
                  >
                    {show =>
                      show &&
                      (props => <Nav click={this.handleClick} style={props} />)
                    }
                  </Transition>
                  <Spring
                    delay={200}
                    config={config.slow}
                    immediate={this.state.toggleNav === undefined}
                    from={{
                      transform: toggleNav
                        ? 'translate3d(0%,0,0)'
                        : 'translate3d(20%,0,0)',
                    }}
                    to={{
                      transform: toggleNav
                        ? 'translate3d(20%,0,0)'
                        : 'translate3d(0%,0,0)',
                    }}
                  >
                    {styles => (
                      <MainLayout style={styles}>
                        <div>{children}</div>
                      </MainLayout>
                    )}
                  </Spring>
                  <Footer>
                    © {new Date().getFullYear()}, Built with Panda
                  </Footer>
                </LayoutWrapper>
              )}
            </Spring>
          </ThemeProvider>
        )}
      />
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
