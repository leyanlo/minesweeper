import styled from 'styled-components';

export const Window = styled.section`
  padding: 3px;
  background-color: #bdbdbd;
  border-width: 1px;
  border-style: solid;
  border-color: #dedede #000 #000 #dedede;
  box-shadow: inset -1px -1px #7b7b7b, inset 1px 1px white;
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

export const WindowMenu = styled.ul`
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style-type: none;
`;

export const WindowMenuItem = styled.li`
  position: relative;

  & > button {
    background-color: transparent;
    border: none;
    &:hover {
      box-shadow: 1px 1px 0 white inset, -1px -1px 0 #707070 inset;
    }
    &:active,
    &:focus,
    &.-open {
      top: 1px;
      left: 1px;
      outline: none;
      box-shadow: 1px 1px 0 #707070 inset, -1px -1px 0 white inset;
    }
  }
  &.-open > button {
    top: 1px;
    left: 1px;
    outline: none;
    box-shadow: 1px 1px 0 #707070 inset, -1px -1px 0 white inset;
  }
`;

export const WindowSubMenu = styled.ul`
  position: absolute;
  left: 0;
  display: none;
  padding: 2px;
  background: #c0c0c0;
  border-top: 1px solid #c0c0c0;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  border-left: 1px solid #c0c0c0;
  box-shadow: 1px 1px 0 white inset, -1px -1px 0 #707070 inset;
  visibility: hidden;
  opacity: 0;
  ${WindowMenuItem}.-open > & {
    display: block;
    visibility: visible;
    opacity: 1;
  }
`;

export const WindowSubMenuItem = styled.li`
  list-style-type: none;

  & > button {
    display: flex;
    width: 100%;
    padding: 1px 18px;
    background-color: transparent;
    border: none;
    &:hover,
    &:active,
    &:focus {
      color: white;
      background-color: #007;
      outline: none;
    }
  }
`;

export const WindowSubMenuSeparator = styled.hr`
  margin: 2px 0;
`;
