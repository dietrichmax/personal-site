import React from "react"
import styled from 'styled-components'
import Poster from "./RiwaVideoPoster.webp"
import { OutboundLink, trackCustomEvent } from "gatsby-plugin-google-analytics"


export const Wrapper = styled.div`
    margin: 2rem auto 2rem auto;
    max-width: 728px;
`
export const Subline = styled.p`
    text-decoration: none;
    font-weight: 400;
    padding: 5px 10px;
    font-size: 1.5rem;
    font-style: italic;
    
`
export const VideoWrapper = styled.video`
  width: 100%;
  height: auto;
  padding-bottom: 2rem;
  border-bottom: solid 2px rgba(10,10,10,0.1);
  outline: none;
`


class RIWAAd extends React.Component {

    

    render () {

        return (
            <Wrapper>
                <Subline>Mit der der Vermessungslösung aus der RIWA-GIS-Software, der Leica GG04 plus Smart-Antenne und dem GNSS Commander von ppm können Kommunen ihre Bestandskataster pflegen und erweitern. Erfassen Sie Objekte schneller und einfacher als jemals zuvor – bei jedem Wetter und unter schwierigen Bedingungen. Weitere Informationen unter:  
                    <OutboundLink href="http://www.riwa-gis.de/"> www.riwa-gis.de</OutboundLink>
                </Subline>
                <VideoWrapper
                    poster={Poster}
                    title="GIS Vermessung für Kommunen mit der mobilen Lösung von RIWA."
                    allowFullScreen
                    controls
                    onPlay={()=> 
                        trackCustomEvent({
                            category: 'Marketing',
                            action: 'View',
                            label: 'RIWAVideoView'
                          })
                    }
                    >
                    <source src="https://media.gis-netzwerk.com/videos/RIWA.mp4" type="video/mp4" />  
                    <source src="https://media.gis-netzwerk.com/videos/RIWA.ogg" type="video/ogg" />
                </VideoWrapper>

            </Wrapper>
        );
    }
}

export default RIWAAd

