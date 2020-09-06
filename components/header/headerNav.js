import styled from 'styled-components'
import Link from 'next/link'
import config from "../../data/SiteConfig";
import React, { Component } from 'react';
import media from 'styled-media-query';
import Logo from '../logo';

const HeaderWrapper = styled.div`
  background-color: #fff;
  display: flex;
  font-family:  open sans,sans-serif;
`

const NavTitle = styled.div`
  width: auto;
  padding: var(--space-sm);
  margin-top: auto;
  margin-bottom: auto;
  color: var(--gray);
  font-size: 2rem;
  font-weight: 500;

`

export const HeaderLogo = styled.div`
  padding: var(--space-sm) 0 var(--space-sm) var(--space-lg);
`

const Links = styled.a`
  max-width: 66.66667%;
  float: right;
  margin: auto var(--space-lg) auto auto;
  font-size: 1.8rem;
  :hover {
    color: var(--primary-color);
  }
`




export default class App extends Component {
  state = {
    toggle:false
  }

  Toggle = () => {
    this.setState({toggle:!this.state.toggle})
  }


  render() {
    
    const headerItems = [
      { "name": "Blog", "link":  "/" }
    ]

    return (
      <HeaderWrapper>

          <HeaderLogo >
            <Logo />
          </HeaderLogo>
          <NavTitle><Link href="/"><a>GIS-Netzwerk</a></Link></NavTitle>
          {headerItems.map((item, i) => (
            <Links>
              <Link key={i} href={item.link}>
                <a>{item.name}</a>
              </Link>
            </Links>
          ))}
      </HeaderWrapper>
    )
  }
}
