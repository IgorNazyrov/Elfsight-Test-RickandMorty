import styled from 'styled-components';
import { Logo } from './Logo';
import { Filter } from '../filter/Filter';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filter />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 951px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
