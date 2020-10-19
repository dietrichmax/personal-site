import React from 'react';
import logo from '../../public/logos/gis-netzwerk_favicon.png';
import styled from 'styled-components';
import config from "../../lib/data/SiteConfig";
//import Img from '@/components/images/image';
import Link from 'next/link'
import Img from 'react-optimized-image';

// styled components
export const LogoWrapper = styled(Img)`
  height: 40px;
  width: 40px;
  cursor: pointer
`;


// component
export default function Logo() {
  return (
    <Link href={config.homePath}>
      <LogoWrapper src={logo} loading="lazy" webp sizes={[40]} inline alt={config.siteTitle} title={config.siteTitle} />
    </Link>
  )
}
