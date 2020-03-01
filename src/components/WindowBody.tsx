/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';

import WindowBodyBoard from './WindowBodyBoard';
import WindowBodyHeading from './WindowBodyHeading';

const BodySection = styled.section`
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  :not(:last-child) {
    margin-bottom: 6px;
  }
`;

const WindowBody = (): JSX.Element => (
  <div
    css={css`
      padding: 6px;
      background-color: #c0c0c0;
      border-width: 3px 0 0 3px;
      border-style: solid;
      border-color: #fff;
    `}
  >
    <BodySection>
      <WindowBodyHeading />
    </BodySection>
    <BodySection>
      <WindowBodyBoard />
    </BodySection>
  </div>
);

export default WindowBody;
