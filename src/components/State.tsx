import styled, { css } from 'styled-components'
import { GameState } from '../back/dataQuery'

export const stateInfo: {
  [key in GameState]: {
    label: string
    color: string
    font: string
  }
} = {
  [GameState.Banned]: {
    label: 'Banned',
    color: '#502020',
    font: '#d0a0a0',
  },
  [GameState.Dropped]: {
    label: 'Dropped',
    color: '#CC0000',
    font: '#ff8080',
  },
  [GameState.Playing]: {
    label: 'Playing',
    color: '#A0A000',
    font: '#ffff80',
  },
  [GameState.Won]: {
    label: 'Won',
    color: '#00A000',
    font: '#80ff80',
  },
  [GameState.Completed]: {
    label: 'Completed',
    color: '#0000FF',
    font: '#8080FF',
  },
  [GameState.Achievements]: {
    label: 'Achievements',
    color: '#00A0A0',
    font: '#80ffff',
  },
}

export const Background = styled.div<{ state: GameState }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  ${(props) => css`
    background: ${stateInfo[props.state].color}50;
    border: 2px solid ${stateInfo[props.state].color};
    color: ${stateInfo[props.state].font};
    font-weight: bolder;
  `}
  border-radius: 20px;
  padding: 4px 8px;
`

export const State = (props: { state: GameState }) => {
  return (
    <Background state={props.state}>{stateInfo[props.state].label}</Background>
  )
}
