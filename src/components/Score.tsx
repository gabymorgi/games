import { Tooltip } from "antd";
import styled from "styled-components";
import { ScoreI } from "../data";
import { DislikeFilled, LikeFilled } from "@ant-design/icons";
import { isDesktop, isMobile } from "../styles/Resolutions";

const StyledScoreHeader = styled.div`
  .title {
    font-weight: bold;
  }
  .group > * {
    text-transform: uppercase;
  }
  @media (${isMobile}) {
    .group {
      padding-left: 8px;
      line-height: 20px;
    } 
  }
  @media (${isDesktop}) {
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
        justify-content: flex-end;
        border-left: 1px solid black;
        border-right: 1px solid black;
        text-orientation: upright;
        width: 25px;
        writing-mode: tb-rl;
        letter-spacing: -5px;
      }
    }
  }
`;

export const ScoreHeader = () => {
  return (
    <StyledScoreHeader>
      <div className="title">Score</div>
      <div className="group">
        <div>content</div>
        <div>lore</div>
        <div>mechanics</div>
        <div>bosses</div>
        <div>controls</div>
        <div>music</div>
        <div>graphics</div>
        <div>extra</div>
        <div>total</div>
      </div>
    </StyledScoreHeader>
  );
};

const StyledScore = styled.div`
  border-radius: 4px;
  display: flex;
  @media (${isMobile}) {
    flex-direction: column;
    align-self: flex-end;
  }
`;

const StyledScoreBar = styled.div<{ value?: number }>`
  width: 25px;
  text-align: center;
  font-weight: bold;
  color: white;
  ${(props) => {
    if (props.value) {
      const color = `hsl(${12 * props.value}, 100%, 30%)`;
      return `
        background: ${color};
        border-left: 1px solid ${color};
        border-right: 1px solid ${color};
      `;
    }
  }}
  @media (${isMobile}) {
    height: 20px;
  }
`;

export const Score = (props: { score?: ScoreI }) => {
  if (!props.score) {
    return <div>-</div>;
  }
  const extraTooltip = props.score.extra?.map((e, i) => (
    <div key={i}>
      {e.bias > 0 ? <LikeFilled /> : <DislikeFilled />} {e.info}
    </div>
  ));
  const extraBias =
    props.score.extra?.reduce((acum, e) => acum + e.bias, 0) || 0;
  const count = Object.entries(props.score)
    .filter(([k, v]) => k !== "extra")
    .reduce((acum, [k, v]) => acum + (v ? 1 : 0), 0);
  const sum = Object.entries(props.score)
    .filter(([k, v]) => k !== "extra")
    .reduce((acum, [k, v]) => acum + v, 0);
  const total = sum / count + extraBias / 5;

  return (
    <StyledScore>
      <StyledScoreBar value={props.score.content}>
        {props.score.content || "-"}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.lore}>
        {props.score.lore || "-"}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.mechanics}>
        {props.score.mechanics || "-"}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.bosses}>
        {props.score.bosses || "-"}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.controls}>
        {props.score.controls || "-"}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.music}>
        {props.score.music || "-"}
      </StyledScoreBar>
      <StyledScoreBar value={props.score.graphics}>
        {props.score.graphics || "-"}
      </StyledScoreBar>
      <StyledScoreBar>
        {props.score.extra ? (
          <Tooltip title={extraTooltip}>{extraBias > 0 ? "⟰" : "⟱"}</Tooltip>
        ) : undefined}
      </StyledScoreBar>
      <StyledScoreBar value={total}>{total.toFixed(1) || "-"}</StyledScoreBar>
    </StyledScore>
  );
};
