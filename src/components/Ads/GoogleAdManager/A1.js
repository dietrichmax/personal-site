import React from "react"
import {Bling as GPT} from "react-gpt";
import styled from 'styled-components'
import useTranslations from '../../useTranslations';
import media from 'styled-media-query';
import './style.css';



const A1 = ({ }) => {

      // translation for ad label
      const { ad, adNotice } = useTranslations();

      const Ad1 = styled.div`
        margin: 2rem auto 0 auto;
        max-width: 728px;
        dsplay: inline-block
      `

        return (
          <>
            <Ad1 >
              <GPT
                  adUnitPath="/21800091745/a1_"
                  sizeMapping={[
                    {viewport: [0, 0], slot: [336, 280]}/*,
                    {viewport: [490, 0], slot: [480, 320]},
                    {viewport: [650, 0], slot: [640, 90]},
                    {viewport: [750, 0], slot: [728, 90]},
                    {viewport: [980, 0], slot: [728, 300]},
                    {viewport: [1050, 0], slot: [728, 200]},
                    {viewport: [1800, 0], slot: [728, 90]}*/
                  ]}
                  style={{
                    margin: '0 2rem 0 2rem'
                  }}
              />
              <span 
                id="adLabel" 
                title={adNotice}
              >
              {ad}
              </span>
            </Ad1>
          </>
        );
    }


export default A1