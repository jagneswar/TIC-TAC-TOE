import React, { useState } from 'react'
import './game.css'

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [over, setOver] = useState(false)
    const [winner, setWinner] = useState(null)
    const [draw, setDraw] = useState(false)

    function checkWin(board){
        const combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
        ]
        for (let i = 0; i < combinations.length; i++) {
            const [a, b, c] = combinations[i];
            if (board[a]!==null && board[a]===board[b] && board[a] === board[c]){
                return board[a];
            }
        }
        return null;
    }
    function checkDraw(board) {
        return board.every(cell => cell !== null);
    }

    function funcReset(){
        const newBoard = [...board]
        for(let i=0; i<9; i++){
            newBoard[i]=null;
        }
        setBoard(newBoard)
        setIsXTurn(true)
        setWinner(null)
        setOver(false)
        setDraw(false)
    }

    function handleClick(idx){
        const newBoard = [...board]
        if(newBoard[idx] || draw) return;
        newBoard[idx] = isXTurn ? "X" : "O"
        setBoard(newBoard)
        setIsXTurn(!isXTurn)
        const winn = checkWin(newBoard)
        const draww = checkDraw(newBoard)
        if(winn){
            setWinner(winn)
            setOver(true)
            setTimeout(()=>{
                funcReset()
            }, 1500)
            return
        }
        if(draww){
            setDraw(true)
            setOver(true)
            setTimeout(()=>{
                funcReset()
            }, 1500)
        }
    }
    return (
        <>
            {draw && (
                <div className='over'>Draw</div>
            )}
            {over && !draw && (
                <div className='over'>Player {winner} Wins</div>
            )}
            {!over && (
                <>
                    <div className="container">
                        <div className='player-turn'>
                            Player {isXTurn ? 'X' : 'O'} turn.
                        </div>
                        <div className='row'>
                            <div className="box" onClick={()=>handleClick(0)}>{board[0]}</div>
                            <div className="box" onClick={()=>handleClick(1)}>{board[1]}</div>
                            <div className="box" onClick={()=>handleClick(2)}>{board[2]}</div>
                        </div>
                        <div className='row'>
                            <div className="box" onClick={()=>handleClick(3)}>{board[3]}</div>
                            <div className="box" onClick={()=>handleClick(4)}>{board[4]}</div>
                            <div className="box" onClick={()=>handleClick(5)}>{board[5]}</div>
                        </div>
                        <div className='row'>
                            <div className="box" onClick={()=>handleClick(6)}>{board[6]}</div>
                            <div className="box" onClick={()=>handleClick(7)}>{board[7]}</div>
                            <div className="box" onClick={()=>handleClick(8)}>{board[8]}</div>
                        </div>
                    </div>
                    <div className="container-reset">
                        <button className='reset' onClick={()=>funcReset()}>Reset</button>
                    </div>
                </>
            )}
        </>
    )
}

export default Game
