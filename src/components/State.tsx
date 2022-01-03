import styled from 'styled-components'
import { GameState } from "../data";

export const stateInfo: {
    [key in GameState]: {
        label: string
        color: string
    }
} = {
    [GameState.Banned]: {
        label: "Banned",
        color: "#300000",
    },
    [GameState.Dropped]: {
        label: "Dropped",
        color: "#CC0000",
    },
    [GameState.Playing]: {
        label: "Playing",
        color: "#A0A000",
    },
    [GameState.Won]: {
        label: "Won",
        color: "#00A000",
    },
    [GameState.Completed]: {
        label: "Completed",
        color: "#0000FF",
    },
    [GameState.Achievements]: {
        label: "Achievements",
        color: "#00A0A0",
    }
}

export const Background = styled.div<{ state: GameState }>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    ${props => `
        color: ${stateInfo[props.state].color};
        border: 1px solid ${stateInfo[props.state].color};
        background: ${stateInfo[props.state].color}20;
    `}
    border-radius: 20px;
    padding: 4px;
`

export const State = (props: { state: GameState }) => {
    return <Background state={props.state}>
        {stateInfo[props.state].label}
    </Background>
}
