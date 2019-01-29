import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import styled from 'styled-components'

const NavStyles = styled.nav`
  grid-area: Sidebar;
  width: 60%;
  height: 100%;
  background: lightcyan;
  margin: 0;
  padding: 1.5rem;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 11;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-top: 100px;
  }
  li {
    padding-bottom: 1rem;
  }

  a {
    color: #797979;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 1.5rem;
    font-weight: 600;
    &:hover {
      color: salmon;
    }
  }
`
const PAGE_TITLE_QUERY = graphql`
  query PageTitleQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`

const Nav = ({ style, click }) => (
  <StaticQuery
    query={PAGE_TITLE_QUERY}
    render={({ allMarkdownRemark }) => (
      <NavStyles style={style}>
        <ul>
          {allMarkdownRemark.edges.map(edge => (
            <li>
              <Link onClick={click} to={`${edge.node.frontmatter.slug}`}>
                {edge.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </NavStyles>
    )}
  />
)

export default Nav
