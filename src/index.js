import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './style.css'
// import App from './App';

const Cell = (props) => {
  return (
    <div className="cell" onClick={props.onClick}>{props.text}</div>
  )
}

const Chessboard = () => {
  const [cells, setCells] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [n, setN] = useState(0)
  const [finished, setFinished] = useState({ result: false, winner: '' })
  const tell = (cells) => {
    for (let i = 0; i < 3; i++) {
      if (cells[i][0] === cells[i][1] && cells[i][1] === cells[i][2] && cells[i][0] !== null) {
        console.log(cells[i][0], '赢了！')
        setFinished({ result: true, winner: cells[i][0] })
      }
    }
    for (let i = 0; i < 3; i++) {
      if (cells[0][i] === cells[1][i] && cells[1][i] === cells[2][i] && cells[0][i] !== null) {
        console.log(cells[0][i], '赢了！')
        setFinished({ result: true, winner: cells[0][i] })
      }
    }
    if (cells[0][0] === cells[1][1] &&
      cells[1][1] === cells[2][2] &&
      cells[0][0] !== null) {
      console.log(cells[0][0], '赢了！')
      setFinished({ result: true, winner: cells[0][0] })
    }
    if (cells[0][2] === cells[1][1] &&
      cells[1][1] === cells[2][0] &&
      cells[1][1] !== null) {
      console.log(cells[1][1], '赢了！')
      setFinished({ result: true, winner: cells[1][1] })
    }
  }
  const onClickCell = (row, col) => {
    // n+1
    setN(n + 1)
    // 改变cells
    const copyMap = JSON.parse(JSON.stringify(cells))
    copyMap[row][col] = n % 2 === 0 ? 'x' : 'o'
    setCells(copyMap)
    // 判断胜负
    tell(copyMap)
  }
  return (
    <div>
      <div>n:{n}</div>
      {cells.map((items, row) => (
        <div className="row" >{items.map((item, col) =>
        (<Cell className="col" text={item}
          onClick={() => onClickCell(row, col)}
        />))}</div>
      ))}
      {finished.result &&
        <div className="gameOver">
          <p className="winText">游戏结束：{finished.winner}赢了！</p>
          {/* <button className="again" onClick={again}>再来一局</button> */}
        </div>
      }
    </div>
  )
}

ReactDOM.render(
  <div>
    <Chessboard />
  </div>,
  document.getElementById('root')
);


