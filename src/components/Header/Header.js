import styled from 'styled-components';
import {Colors , Spaces } from '../../shared/DesignTokens';
import rateTheHeroLogo from '../../assets/images/rate-the-hero-logo.png';

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${Colors.RED_800};
  padding: ${Spaces.ONE};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${Spaces.THREE}};

  @media (min-width: 1024px) {
    padding: ${Spaces.TWO};
    height: 90px;
    margin-bottom: ${Spaces.FIVE};
  }
`;

const Logo = styled.img.attrs({ //os atributos src e alt são passados para o elemento img
  src: rateTheHeroLogo,
  alt: 'Logo de "Rate The Hero Logo"!', //por ser um styled components é obrigatório o uso de crase
})`
  height: 100%;
`;

export default function Header() {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  );
}
