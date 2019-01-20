import styled from 'styled-components';

export const Hero = styled.div`
  --heroImageSize: 96px;

  display: flex;
  justify-content: center;
  align-items: center;
  min-height: var(--mainMinHeight);
  text-align: center;
  background-color: var(--bodyBackground);
`;

export const HeroCard = styled.div`
  position: relative;
  margin: calc(0.5 * var(--heroImageSize) + 16px) 8px;
  padding: calc(0.5 * var(--heroImageSize) + 16px) 32px 32px;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 5px var(--xLightGray);
`;
