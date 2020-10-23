import * as AppConst from '../consts/app.const';
import { Dispatch } from 'react';
import { ActionDeclaration } from '../models/action';
// Player 2 control
export const startPlayerTwoTurn = () => async(dispatch: Dispatch<ActionDeclaration>) => {
    await dispatch({
        type: AppConst.PLAYER_2_TURN_START,
        payload: true
    });
}

export const GetPlayerTwoCheckedValue = (index: Number) => async(dispatch: Dispatch<ActionDeclaration | Function>) => {
    dispatch({
        type: AppConst.SAVE_PLAYER_2_STEP,
        payload: index
    });
    dispatch(endPlayerTwoTurn());
    dispatch(startPlayerOneTurn());
};

export const endPlayerTwoTurn = () => async(dispatch: Dispatch<ActionDeclaration>) => {
    await dispatch({
        type: AppConst.PLAYER_2_TURN_END,
        payload: true
    });
}
// Player 1 control
export const startPlayerOneTurn = () => async(dispatch: Dispatch<ActionDeclaration>) => {
    await dispatch({
        type: AppConst.PLAYER_1_TURN_START,
        payload: true
    })
}

export const GetPlayerOneCheckedValue = (index: Number) => async(dispatch: Dispatch<ActionDeclaration | Function>) => {
    dispatch({
        type: AppConst.SAVE_PLAYER_1_STEP,
        payload: index
    });
    dispatch(endPlayerOneTurn());
    dispatch(startPlayerTwoTurn());
}

export const endPlayerOneTurn = () => async(dispatch: Dispatch<ActionDeclaration>) => {
    await dispatch({
        type: AppConst.PLAYER_1_TURN_END,
        payload: true
    });
}

// game control
export const startNewGame = () => async(dispatch: Dispatch<ActionDeclaration>) => {
    dispatch({
        type: AppConst.START_NEW_GAME,
        payload: true
    });
}

export const endGame = () => async(dispatch: Dispatch<ActionDeclaration>) => {
    dispatch({
        type: AppConst.END_GAME,
        payload: true
    });
}

export const notifyPlayerOneWinner = ()  => async(dispatch: Dispatch<ActionDeclaration | Function>) => {
    dispatch({
        type: AppConst.PLAYER_1_WIN,
        payload: true
    });
    dispatch(endGame());
}

export const notifyPlayerTwoWinner = ()  => async(dispatch: Dispatch<ActionDeclaration | Function>) => {
    dispatch({
        type: AppConst.PLAYER_2_WIN,
        payload: true
    });
    dispatch(endGame());
}