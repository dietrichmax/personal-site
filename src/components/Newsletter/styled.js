import styled from 'styled-components';
import { Emojione } from "react-emoji-render"

export const NewsletterWrapper = styled.form`
    display: flex;
    flex: 0 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    max-width: 750px;
    justify-content: center;
`
export const DescriptionWrapper = styled.div`
    text-align: center;
    flex-grow: 0;    
    flex-shrink: 0;
    flex-basis: 100%;    
    max-width: 100%;
`

export const InputWrapper = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 66.66667%;
`

export const Input = styled.input`
    padding-top: 15px!important;
    padding-bottom: 15px!important;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid hsla(0,0%,90.2%,.95);
    :invalid {
        border: 1px solid red;
    }
`

export const ButtonWrapper = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    max-width: 33.33333%;
`

export const Button = styled.button`
    box-sizing: border-box;
    border: 2px solid ${props =>
        props.background ? props.background : 'white'};
    color: white;
    text-transform: uppercase;
    position: relative;
    padding-top: 15px!important;
    padding-bottom: 15px!important;
    outline: none;
    overflow: hidden;
    width: 100%;
    transition: all .2s ease-in-out;
    text-align: center;
    background: ${props =>
        props.background ? props.background : 'hsla(0,0%,90.2%,.95)'};
    :hover {
        box-shadow: rgba(0, 0, 0, 0.5) 0px 8px 16px 0px;
    }
        
`

export const Emoji = styled(Emojione)`
    display: inline-block;
`