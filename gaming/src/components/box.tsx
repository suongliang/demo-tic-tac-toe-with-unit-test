import React from 'react';
import { RootState } from '../models/reducerStates';
import { useSelector } from 'react-redux';

type BoxProps = {
    index: number,
    checkTheBox: Function,
    currentStepsOnboard: Array<string>
}
function Box(props: BoxProps) {
    const { index, checkTheBox, currentStepsOnboard } = props;
    
    const isGameStarted = useSelector((state: RootState) => state.app.newGame);
        
        return (
        <button key={index} className={!isGameStarted? "box" : "box game-begin"}
        role="button"
        style={{ zIndex: isGameStarted ? 0 : -1 }}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => checkTheBox(e)}
            data-index={index}
            data-testid={index}
        >
            {
                isGameStarted &&
                currentStepsOnboard[index] !== "" ? 
                <span className="mark font-weight-bold">{currentStepsOnboard[index]}</span>
                : null
            }

        </button>
    )
}

export default Box

