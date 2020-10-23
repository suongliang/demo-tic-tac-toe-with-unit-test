import * as AppConst from "../consts/app.const";
import { ActionDeclaration } from "../models/action";
import { AppState } from "../models/reducerStates";

const initialState: AppState = {
    playerOneWin: false,
    playerTwoWin: false,
    winableSteps: [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [3, 4, 5],
        [6, 7, 8],
        [2, 5, 8],
        [2, 4, 6]
    ],
    currentStepsOnboard: [
        "", "", "",
        "", "", "",
        "", "", ""
    ],
    gameOver: false,
    newGame: false,
    playerOneTurnEnd: false,
    playerOneTurnStart: false,
    playerTwoTurnEnd: false,
    playerTwoTurnStart: false
};

export default (state = initialState, action: ActionDeclaration) => {
    switch (action.type) {

        case AppConst.SAVE_PLAYER_2_STEP:
            return {
                ...state,
                currentStepsOnboard: state.currentStepsOnboard.map(
                    (content, i) => i === action.payload ? "O" : content
                )
            }

        case AppConst.SAVE_PLAYER_1_STEP:
            return {
                ...state,
                currentStepsOnboard: state.currentStepsOnboard.map(
                    (content, i) => i === action.payload ? "X" : content
                )
            }

        case AppConst.END_GAME:
            return {
                ...state,
                gameOver: action.payload
            };

        case AppConst.START_NEW_GAME:
            return {
                ...state,
                playerOneWin: initialState.playerOneWin,
                playerTwoWin: initialState.playerTwoWin,
                winableSteps: initialState.winableSteps,
                gameOver: initialState.gameOver,
                newGame: true,
                playerOneTurnEnd: initialState.playerOneTurnEnd,
                playerOneTurnStart: initialState.playerOneTurnStart,
                playerTwoTurnEnd: initialState.playerTwoTurnEnd,
                playerTwoTurnStart: initialState.playerTwoTurnStart,
                currentStepsOnboard: initialState.currentStepsOnboard
            }

        case AppConst.PLAYER_2_WIN:
            return {
                ...state,
                playerTwoWin: true
            }

        case AppConst.PLAYER_1_WIN:
            return {
                ...state,
                playerOneWin: true
            }

        case AppConst.PLAYER_1_TURN_END:
            return {
                ...state,
                playerOneTurnEnd: action.payload,
                playerOneTurnStart: !action.payload
            }

        case AppConst.PLAYER_1_TURN_START:
            return {
                ...state,
                playerOneTurnStart: action.payload,
                playerOneTurnEnd: !action.payload
            }

        case AppConst.PLAYER_2_TURN_END:
            return {
                ...state,
                playerTwoTurnEnd: action.payload,
                playerTwoTurnStart: !action.payload
            }

        case AppConst.PLAYER_2_TURN_START:
            return {
                ...state,
                playerTwoTurnStart: action.payload,
                playerTwoTurnEnd: !action.payload
            }

        default:
            return state
    }
}
