import React, { useState } from 'react';
import './Game.scss';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import * as Icon from 'react-feather';

class SquareBtn {
  constructor(value = null, isActive = true) {
    this.isActive = isActive;
    this.value = value;
  }
}
const initialState = () => [
  [new SquareBtn(0), new SquareBtn(1), new SquareBtn(2)],
  [new SquareBtn(3), new SquareBtn(4), new SquareBtn(5)],
  [new SquareBtn(6), new SquareBtn(7), new SquareBtn(8)],
];

const initialHistoryState = () => [
  {
    squares: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
  },
];

const Square = ({ square, onClick }) => {
  return (
    <Button
      variant="outlined"
      color={square.isActive ? 'primary' : 'secondary'}
      disabled={!square.isActive}
      onClick={onClick}>
      {square.value}
    </Button>
  );
};

const Restart = ({ onClick }) => {
  return (
    <Button variant="outlined" color="secondary" onClick={onClick}>
      Restart
    </Button>
  );
};

const isBoardFull = (square) => {
  return square.flat().every((num) => typeof num.value !== 'number');
};

const calculateWinner = (square) => {
  let gameWonBy = null;
  const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const mergeSquare = square.flat();

  winCombination.forEach(([first, second, third]) => {
    if (
      mergeSquare[first].value === mergeSquare[second].value &&
      mergeSquare[first].value === mergeSquare[third].value
    ) {
      console.log('Game OVER....', mergeSquare[first].value);
      gameWonBy = mergeSquare[first].value;
      return;
    }
  });
  return gameWonBy;
};

const Game = () => {
  const [square, setSquare] = useState(initialState());
  const [whoNext, setWhoNext] = useState('X');
  const [history, setHistory] = useState(initialHistoryState());
  const winner = calculateWinner(square);

  const getStatus = () => {
    if (winner != null) {
      return 'Winner: ' + winner;
    } else if (isBoardFull(square)) {
      return 'Draw!';
    } else {
      return 'Next player: ' + (whoNext === 'X' ? 'X' : 'O');
    }
  };

  const playGame = (row, col, counter) => {
    return (
      <Square
        key={counter}
        square={square[row][col]}
        onClick={() => {
          if (winner != null) return;
          const newSquare = square.slice();
          setWhoNext(whoNext === 'X' ? 'O' : 'X');
          newSquare[row][col] = new SquareBtn(whoNext, false);
          setSquare(newSquare);
          const { squares } = _.cloneDeep({ ...history[history.length - 1] });
          squares[row][col] = whoNext;
          setHistory(history.concat({ squares: squares }));
        }}
      />
    );
  };

  const restart = () => {
    return (
      <Restart
        onClick={() => {
          setSquare(initialState());
          setWhoNext('X');
          setHistory(initialHistoryState());
        }}
      />
    );
  };

  return (
    <div className="container">
      <h2>
        TIC-TAC-TOE <Icon.CloudRain />
      </h2>
      <p>
        <Icon.Calendar /> {moment().format('MMMM Do YYYY')}
      </p>
      <div className="board">
        {[0, 1, 2].map((row) => {
          let counter = 0;
          return (
            <div className="board-row" key={row}>
              {[0, 1, 2].map((col) => {
                return playGame(row, col, counter++);
              })}
            </div>
          );
        })}
      </div>
      <div style={{ margin: 10 }}>{getStatus()}</div>
      <div>{restart()}</div>
      <div className="history">
        {/* <h2>Player Steps</h2> */}
        {history.map((step, idx) => {
          let ulCounter = 1;
          let liCounter = 1;

          return (
            <React.Fragment key={++ulCounter * idx + ++liCounter * idx}>
              <ul style={{ listStyle: 'none' }}>
                <h4>Step: {idx}</h4>
                {step.squares.map((s, sIdx) => {
                  return (
                    <li key={ulCounter++ * sIdx + liCounter++ * sIdx}>{s}</li>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Game;
