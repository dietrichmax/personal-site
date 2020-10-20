import styled from 'styled-components';
import media from 'styled-media-query';

const ButtonHamburger = styled.button`
  background: transparent;
  display: inline-block;
  width: 50px;
  height: 50px;
  border: none;
  position: absolute;
  border-radius: 3px;
  top: var(--space-sm);
  right: var(--space-sm);
  outline: none;
  ${media.greaterThan('medium')`
    display: none;
  `}

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
    background: var(--gray-light);
    border-radius: 10px;
    display: inline-block;
    height: 2px;
    width: 70%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:before,
    &:after {
      content: '';
      background: var(--gray-light);
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


export const ButtonMenu = props => {
  return (
    <ButtonHamburger
      onClick={props.handleClick}
      className={props.isActive ? 'active' : ''}
      title="Menu"
    >
      <span></span>
    </ButtonHamburger>
  );
};

export default ButtonMenu;
