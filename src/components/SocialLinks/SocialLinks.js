import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEnvelope, faRss} from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faInstagram, faXing, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { library, config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import '@fortawesome/fontawesome-svg-core/styles.css'
import useTranslations from '../useTranslations';
import { Link } from "gatsby"
import * as S from './styled';

const iconHeart = <FontAwesomeIcon icon={faHeart} style={{color:'red'}}/>
const iconInsta = <FontAwesomeIcon icon={faInstagram}/>
const iconTwitter = <FontAwesomeIcon icon={faTwitter} />
const iconRss = <FontAwesomeIcon icon={faRss} />
const iconMail = <FontAwesomeIcon icon={faEnvelope} />
const iconXing = <FontAwesomeIcon icon={faXing} />
const iconLinkedin = <FontAwesomeIcon icon={faLinkedin} />
const iconGithub = <FontAwesomeIcon icon={faGithub} />

const SocialLinks = () => {
    return (
        <S.SocialLinks>
            <S.LinkInsta title="Instagram" alt="Instagram" href="https://www.instagram.com/_maxdietrich/">{iconInsta}</S.LinkInsta>
            <S.LinkTwitter title="Twitter" alt="Twitter" href="https://twitter.com/GISNetzwerk">{iconTwitter}</S.LinkTwitter>
            <S.LinkXing title="Xing" alt="Xing" href="https://www.xing.com/profile/Max_Dietrich7">{iconXing}</S.LinkXing>
            <S.LinkLinkedin title="Linkedin" alt="Linkedin" href="https://www.linkedin.com/in/max-dietrich-807bb5161/">{iconLinkedin}</S.LinkLinkedin>
            <S.LinkGitHub title="Github" alt="Github" href="https://github.com/DaTurboD/GIS-Netzwerk">{iconGithub}</S.LinkGitHub>
            <S.LinkMail title="Mail" alt="Mail" href="mailto:kontakt@gis-netzwerk.com">{iconMail}</S.LinkMail>
        </S.SocialLinks>
    );
  
}

export default SocialLinks;
