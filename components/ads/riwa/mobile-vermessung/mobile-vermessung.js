import styled from 'styled-components'
import Link from 'next/link'

export const Wrapper = styled.div`
    margin-top: var(--space-sm);
    border-bottom: solid 1px var(--gray-light);
`
export const Subline = styled.p`
    text-decoration: none;
    font-size: 1.5rem;
    font-style: italic;
    
`
export const VideoWrapper = styled.video`
    width: 100%;
    height: auto;
    outline: none;
`


export default function RIWAAD({ allTags}) {


        const tags = []
        {allTags.map((tag) => (
            tags.push(tag.name)
        ))}
        return (
            tags.includes("GIS") ?
                <Wrapper>
                    <Subline>Mit der der Vermessungslösung aus der RIWA-GIS-Software, der Leica GG04 plus Smart-Antenne und dem GNSS Commander von ppm können Kommunen ihre Bestandskataster pflegen und erweitern. Erfassen Sie Objekte schneller und einfacher als jemals zuvor – bei jedem Wetter und unter schwierigen Bedingungen.  
                    Weitere Informationen unter:
                        <Link href="http://www.riwa-gis.de/"> 
                            <a title="RIWA">www.riwa-gis.de</a>
                        </Link>
                    </Subline>
                    <VideoWrapper
                        poster="https://api.gis-netzwerk.com/uploads/Riwa_Video_Poster_1bbae2c5b5.webp"
                        title="GIS Vermessung für Kommunen mit der mobilen Lösung von RIWA."
                        allowFullScreen
                        controls
                        >
                        <source src="https://api.gis-netzwerk.com/uploads/RIWA_c362ed53c5db64c3371fcc63cd48e430_470acdc76f.mp4?747687" type="video/mp4" />  
                    </VideoWrapper>

                </Wrapper>
            : null
        );
    
}
