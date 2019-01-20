import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 0 8px;

  /* Constrain on larger screens */
  @media screen and (min-width: 976px) {
    width: 960px;
    margin: 0 auto;
    padding: 0;
  }
`;

export const MainContainer = styled(Container)`
  padding: 8px 0;

  /* Constrain on larger screens */
  @media screen and (min-width: 976px) {
    padding: 8px 0;
  }
`;
