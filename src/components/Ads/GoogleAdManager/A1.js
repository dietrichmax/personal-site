import React from "react"
import {Bling as GPT} from "react-gpt";
import styled from 'styled-components'
import useTranslations from '../../useTranslations';

export const Subline = styled.p`
    text-decoration: none;
    font-size: 1rem;
    text-align: right;
    margin: 0 !important;
`
export const Ad1 = styled.div`
    margin: auto;
    max-width: 1000px;
    padding: 20px
`

GPT.enableSingleRequest();



const A1 = ({ }) => {

      // translation for ad label
      const { ad, adNotice } = useTranslations();

        return (
          
            <Ad1 >
              <GPT
                  adUnitPath="/21800091745/a1_"
                  //collapseEmptyDiv
                  style={{margin:'auto !important'}}
                  sizeMapping={[
                    {viewport: [0, 0], slot: [336, 280]},
                    {viewport: [490, 0], slot: [480, 320]},
                    {viewport: [650, 0], slot: [640, 90]},
                    {viewport: [750, 0], slot: [728, 90]},
                    {viewport: [980, 0], slot: [750, 300]},
                    {viewport: [1050, 0], slot: [970, 200]},
                    {viewport: [1800, 0], slot: [970, 100]}
                  ]}
                  
              />
              <Subline title={adNotice}>{ad}</Subline>
            </Ad1>
        );
    }


export default A1