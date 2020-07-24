import styled from 'styled-components';
import media from 'styled-media-query';
import LocalizedLink from '../LocalizedLink';


export const SocialShareWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid  var(--gray-extra-light);
`
export const ShareCount = styled.div`
    text-align: center;
`

export const SocialShareShare = styled.div`
    margin-right: 20px;
`

export const SocialShareLinks = styled.div`
    ${media.lessThan('medium')`
        text-align: center;
        width: 100%;
        margin: 10px auto 10px auto;
    `}
`