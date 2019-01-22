import styled from 'styled-components';

export const Window = styled.section`
  padding: 3px;
  overflow: hidden;
  background-color: #bdbdbd;
  border-width: 1px;
  border-style: solid;
  border-color: #dedede #000 #000 #dedede;
  box-shadow: inset -1px -1px #7b7b7b, inset 1px 1px #fff;
`;

export const WindowHeader = styled.header`
  height: 18px;
  padding: 1px;
  color: white;
  font-weight: bold;
  white-space: nowrap;
  background: linear-gradient(to right, #000080, #1084d0);
`;

export const WindowHeaderIcon = styled.img`
  width: 16px;
  height: 16px;
  margin: 1px;
  vertical-align: top;
`;
