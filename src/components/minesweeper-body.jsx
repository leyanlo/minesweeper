import * as PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledMinesweeperBody = styled.div`
  padding: 7px;
  background-color: #bdbdbd;
  border-width: 1px;
  border-style: solid;
  border-color: #dedede #000 #000 #dedede;
  box-shadow: inset -1px -1px #7b7b7b, inset 1px 1px white;
`;

const MinesweeperSection = styled.section`
  border: 2px solid;
  border-color: #7d7d7d #fff #fff #7d7d7d;
  &:nth-last-child(n + 2) {
    margin-bottom: 7px;
  }
`;

const MinesweeperHeading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px;
`;

const MinesweeperHeadingNumber = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 23px;
  padding-top: 3px;
  color: #ff0201;
  font-size: 29px;
  font-family: 'Digital-7 Mono', sans-serif;
  background: black;
`;

const MinesweeperHeadingButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background-color: #bdbdbd;
  box-shadow: inset -1px -1px #7b7b7b, inset 1px 1px white;
`;

class MinesweeperBody extends React.PureComponent {
  render() {
    const { numMines, timer } = this.props;
    return (
      <StyledMinesweeperBody>
        <MinesweeperSection>
          <MinesweeperHeading>
            <MinesweeperHeadingNumber>
              {numMines.toString().padStart(3, '0')}
            </MinesweeperHeadingNumber>
            <MinesweeperHeadingButton>
              <span role="img" aria-label="smile">
                🙂
              </span>
            </MinesweeperHeadingButton>
            <MinesweeperHeadingNumber>
              {timer.toString().padStart(3, '0')}
            </MinesweeperHeadingNumber>
          </MinesweeperHeading>
        </MinesweeperSection>
        <MinesweeperSection>TODO</MinesweeperSection>
      </StyledMinesweeperBody>
    );
  }
}

MinesweeperBody.propTypes = {
  numMines: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired
};

export default MinesweeperBody;
