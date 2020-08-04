import styled from 'styled-components';
import media from 'styled-media-query';

export const ButtonHamburger = styled.button`
  background: transparent;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: none;
  position: absolute;
  border-radius: 3px;
  top: var(--space-sm);
  left: 40px;
  outline: none;
  &.active {
    span {
      background: transparent;
      &:before,
      &:after {
        top: 0;
        left: 0;
      }
      &:before {
        transform: rotate(-45deg);
      }
      &:after {
        transform: rotate(45deg);
      }
    }
  }
  span {
    background: var(--text-dark);
    border-radius: 10px;
    display: inline-block;
    height: 2px;
    width: 60%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:before,
    &:after {
      content: '';
      background: var(--text-dark);
      border-radius: 10px;
      display: inline-block;
      height: 2px;
      width: 100%;
      position: absolute;
      left: 0;
      transition: 0.3s;
    }
    &:before {
      top: -8px;
    }
    &:after {
      bottom: -8px;
    }
  }
`;