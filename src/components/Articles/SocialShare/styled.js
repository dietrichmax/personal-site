import styled from 'styled-components';
import media from 'styled-media-query';


export const SocialShareWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    padding: 1.5rem 0 1rem 0;
`
export const ShareCount = styled.div`
    text-align: center;
`

export const SocialShareShare = styled.div`
    margin-right: 20px;
`

export const SocialShareButttonWrapper = styled.div`
    display: inline-block;
    margin: 1rem;
`

export const SocialShareLinks = styled.div`
    margin-top: 1.5rem;
    ${media.lessThan('medium')`
        text-align: center;
        width: 100%;
        margin: 10px auto 10px auto;
    `}
`