import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../models/reducerStates';
import { startNewGame, startPlayerOneTurn, GetPlayerOneCheckedValue, GetPlayerTwoCheckedValue, notifyPlayerOneWinner, notifyPlayerTwoWinner, endGame } from '../actions/app.action';

import Box from './box';
interface Props {

}

export const TictacBoard = (props: Props) => {

    const appState = useSelector((state: RootState) => state.app);
    const dispatch = useDispatch();
    const isGameStarted = appState.newGame;

    const isPlayerOneTurn = useSelector((state: RootState) => state.app.playerOneTurnStart);
    const isPlayerOneTurnEnd = useSelector((state: RootState) => state.app.playerOneTurnEnd);
    const isPlayerTwoTurn = useSelector((state: RootState) => state.app.playerTwoTurnStart);

    const startGame = () => {
        dispatch(startNewGame());
        dispatch(startPlayerOneTurn());
    }

    const renderRows = () => (
        <div className="tic-tac-wrapper">
            <div className="tic-tac-row">
                {renderBoxes()}
            </div>
        </div>
    )

    const getTheWinner = async (squares: Array<string>, winableSteps: Array<number[]>) => {
        for (let i = 0; i < winableSteps.length; i++) {
            const [a, b, c] = winableSteps[i];
            let box1 = squares[a];
            let box2 = squares[b];
            let box3 = squares[c];
            if (box1 === "" || box2 === "" || box3 === "") {
                continue;
            }
            if (box1 === box2 && box2 === box3) {
                isPlayerOneTurnEnd && isPlayerTwoTurn ? dispatch(notifyPlayerOneWinner()) : dispatch(notifyPlayerTwoWinner());
                break;
            }
        }
        if (squares.length === 9 && squares.every(x => x !== "")) {
            dispatch(endGame());
        }
    }

    useEffect(() => {
        getTheWinner(appState.currentStepsOnboard, appState.winableSteps);
    }, [appState.currentStepsOnboard])

    const checkTheBox = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const el = e.target as HTMLInputElement;
        const boxIndex = Number(el.getAttribute('data-index'));
        appState.currentStepsOnboard.forEach((element, index) => {
            if (index === boxIndex && !appState.gameOver) {
                if (element === "") {
                    isPlayerOneTurn ? dispatch(GetPlayerOneCheckedValue(boxIndex)) : dispatch(GetPlayerTwoCheckedValue(boxIndex));
                }
            }
        });
    }

    const renderBoxes = () => {
        let boxes = [];

        for (let index = 0; index < 9; index++) {
            boxes.push(
                <Box
                    key={index}
                    {...{
                        index,
                        checkTheBox,
                        currentStepsOnboard: appState.currentStepsOnboard
                    }} />
            )
        }
        return boxes;
    }

    return (
        <div className="tic-tac-board">
            {renderRows()}
            <div className="my-3 text-center">
                {
                    isGameStarted ? (
                        <div>
                            {
                                appState.gameOver ?
                                    (<React.Fragment>
                                        <div className="d-flex winner-alert">
                                            {appState.playerOneWin ? "Player 1 Win" : appState.playerTwoWin ? "Player 2 Win" : ""}
                                        </div>
                                        <button onClick={() => startGame()}>Restart game</button>
                                    </React.Fragment>)
                                    : !isPlayerOneTurn ? "Player 2 turn" : "Player 1 turn"
                            }
                            {
                                appState.gameOver && appState.currentStepsOnboard.length === 9 && !appState.playerOneWin && !appState.playerTwoWin && (
                                    <div>No Winner, please restart a new game </div>
                                )
                            }
                        </div>) : <button onClick={() => startGame()}>Start New Game</button>
                }

            </div>
        </div>
    )
}
