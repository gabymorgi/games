import { Tooltip } from 'antd'
import styled from 'styled-components'
import Icon from '@mdi/react'
import { DislikeFilled, InfoCircleFilled, LikeFilled } from '@ant-design/icons'
import {
  mdiCup,
  mdiBookOpenPageVariant,
  mdiChemicalWeapon,
  mdiRobotAngry,
  mdiGoogleController,
  mdiInstagram,
  mdiMusicClefTreble,
  mdiOneUp,
  mdiSchool,
} from '@mdi/js'
import { ScoreI } from '../back/dataQuery'

const StyledScoreHeader = styled.div`
  .title {
    font-weight: bold;
  }
  .group > * {
    text-transform: uppercase;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  .group {
    display: flex;
    > * {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25px;
      svg {
        width: 21px !important;
        height: unset !important;
      }
    }
  }
`

export const ScoreHeader = () => {
  /**
   * content -> mdiCup
   * lore -> book open page variant
   * mechanics -> mdiChemicalWeapon  - mdiCubeUnfolded
   * bosses -> skull-scan - mdiRobotAngry
   * controls -> mdiGoogleController
   * music -> mdiMusicClefTreble
   * graphics -> mdiInstagram
   * extra -> mdiOneUp
   * total -> mdiSchool
   */
  return (
    <StyledScoreHeader>
      <div className="title">Score</div>
      <div className="group">
        <div>
          <Icon path={mdiCup} title="content" size={1} color="white" />
        </div>
        <div>
          <Icon
            path={mdiBookOpenPageVariant}
            title="Lore"
            size={1}
            color="white"
          />
        </div>
        <div>
          <Icon
            path={mdiChemicalWeapon}
            title="mechanics"
            size={1}
            color="white"
          />
        </div>
        <div>
          <Icon path={mdiRobotAngry} title="bosses" size={1} color="white" />
        </div>
        <div>
          <Icon
            path={mdiGoogleController}
            title="controls"
            size={1}
            color="white"
          />
        </div>
        <div>
          <Icon
            path={mdiMusicClefTreble}
            title="music"
            size={1}
            color="white"
          />
        </div>
        <div>
          <Icon path={mdiInstagram} title="graphics" size={1} color="white" />
        </div>
        <div>
          <Icon path={mdiOneUp} title="extra" size={1} color="white" />
        </div>
        <div>
          <Icon path={mdiSchool} title="total" size={1} color="white" />
        </div>
      </div>
    </StyledScoreHeader>
  )
}

const StyledScore = styled.div`
  border-radius: 4px;
  display: flex;
`

const StyledScoreBar = styled.div<{ value?: number }>`
  width: 25px;
  text-align: center;
  font-weight: bold;
  color: white;
  ${(props) => {
    if (props.value) {
      const color = 12 * props.value
      return `
        background: ${`hsl(${color}, 100%, 30%)`};
        border: 1px solid ${`hsl(${color}, 100%, 40%)`};
      `
    }
  }}
`

export const Score = (props: { score?: ScoreI }) => {
  if (!props.score) {
    return <div>-</div>
  }
  const extraTooltip = props.score.extra?.map((e, i) => (
    <div key={i}>
      {e.bias > 0 ? (
        <LikeFilled />
      ) : e.bias < 0 ? (
        <DislikeFilled />
      ) : (
        <InfoCircleFilled />
      )}{' '}
      {e.info}
    </div>
  ))
  const extraBias =
    props.score.extra?.reduce((acum, e) => acum + e.bias, 0) || 0

  return (
    <StyledScore>
      <StyledScoreBar value={props.score.content}>
        {props.score.content || '-'}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.lore}>
        {props.score.lore || '-'}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.mechanics}>
        {props.score.mechanics || '-'}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.bosses}>
        {props.score.bosses || '-'}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.controls}>
        {props.score.controls || '-'}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.music}>
        {props.score.music || '-'}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.graphics}>
        {props.score.graphics || '-'}
      </StyledScoreBar>
      <StyledScoreBar>
        {props.score.extra ? (
          <Tooltip title={extraTooltip}>
            {extraBias > 0 ? '⟰' : extraBias < 0 ? '⟱' : '⨌'}
          </Tooltip>
        ) : undefined}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.finalMark}>
        {props.score.finalMark || '-'}
      </StyledScoreBar>
    </StyledScore>
  )
}
