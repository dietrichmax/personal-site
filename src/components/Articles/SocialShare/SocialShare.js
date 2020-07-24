import React, { Component } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  RedditIcon
} from "react-share";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import useTranslations from '../useTranslations';
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
        <S.SocialShareShare>{sharePost}</S.SocialShareShare>
        <S.SocialShareLinks>
          <RedditShareButton url={url} title={post.title}>
            <RedditIcon round size={iconSize} />
            <RedditShareCount url={url}>
              {count => renderShareCount(count)}
            </RedditShareCount>
          </RedditShareButton>
          <TwitterShareButton url={url} title={post.title}>
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
          <FacebookShareButton url={url} quote={postNode.excerpt}>
            <FacebookIcon round size={iconSize} />
            <FacebookShareCount url={url}>
              {count => renderShareCount(count)}
            </FacebookShareCount>
          </FacebookShareButton>
          <LinkedinShareButton
            url={url}
            title={post.title}
            description={postNode.excerpt}
          >
            <LinkedinIcon round size={iconSize} />
          </LinkedinShareButton>
        </S.SocialShareLinks>
      </S.SocialShareWrapper>
    );
  
}

export default SocialShare;
