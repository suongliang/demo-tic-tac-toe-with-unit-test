export type AppState = {
    playerOneWin: boolean,
    playerTwoWin: boolean,
    winableSteps: Array<number[]>,
    currentStepsOnboard: Array<string>;
    gameOver: boolean,
    newGame: boolean,
    playerOneTurnEnd: boolean,
    playerOneTurnStart: boolean,
    playerTwoTurnEnd: boolean,
    playerTwoTurnStart: boolean
}

export type RootState = {
    app: AppState
}