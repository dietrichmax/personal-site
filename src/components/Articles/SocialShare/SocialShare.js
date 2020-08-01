import React, { Component } from "react";
import {
  FacebookShareButton,
  EmailShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon
} from "react-share";
import urljoin from "url-join";
import config from "../../../../data/SiteConfig";
import useTranslations from '../../useTranslations';
import * as S from './styled';

const SocialShare = ({
  postNode,
  postPath,
}) => {
    
const { sharePost } = useTranslations();
const post = postNode.frontmatter;

const url = urljoin(config.siteUrl, config.pathPrefix, postPath);
const iconSize = 48;

const filter = count => (count > 0 ? count : "");
const renderShareCount = count => (
<S.ShareCount>{filter(count)}</S.ShareCount>
);

    return (
      <S.SocialShareWrapper>
        <S.SocialShareLinks>
          <S.SocialShareButttonWrapper>
            <RedditShareButton url={url} title={post.title} alt="Reddit">
              <RedditIcon size={iconSize} />
              <RedditShareCount url={url}>
                {count => renderShareCount(count)}
              </RedditShareCount>
            </RedditShareButton>
          </S.SocialShareButttonWrapper>
          
          <S.SocialShareButttonWrapper>
            <TwitterShareButton url={url} title={post.title} alt="Twitter">
              <TwitterIcon size={iconSize} />
            </TwitterShareButton>
          </S.SocialShareButttonWrapper>
          <S.SocialShareButttonWrapper>
            <FacebookShareButton url={url} quote={postNode.excerpt} alt="Facebook">
              <FacebookIcon size={iconSize} />
              <FacebookShareCount url={url}>
                {count => renderShareCount(count)}
              </FacebookShareCount>
            </FacebookShareButton>
          </S.SocialShareButttonWrapper>
          <S.SocialShareButttonWrapper>
            <LinkedinShareButton url={url} title={post.title} description={postNode.excerpt} alt="Linkedin" >
              <LinkedinIcon 
                size={iconSize} 
              />
            </LinkedinShareButton>
          </S.SocialShareButttonWrapper>
          <S.SocialShareButttonWrapper>
            <EmailShareButton 
              url={url} 
              title={post.title}
              alt="Email"
            >
              <EmailIcon 
                size={iconSize}
                alt="Email"
              />
            </EmailShareButton>
          </S.SocialShareButttonWrapper>
        </S.SocialShareLinks>
      </S.SocialShareWrapper>
    );
  
}

export default SocialShare;
