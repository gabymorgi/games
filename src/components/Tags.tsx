import { Col, Row } from "antd";
import styled from "styled-components";
import { GameTag } from "../data";

const Tag = styled.div<{ color: string }>`
  ${(props) => `
        color: ${props.color};
        border: 2px solid ${props.color};
        background: ${props.color}50;
    `}
  font-weight: bold;
  border-radius: 20px;
  padding-left: 8px;
  padding-right: 8px;
`;

//https://mokole.com/palette.html
//https://app.contrast-finder.org/result.html?foreground=%23FF0000&background=%23006400&ratio=7&isBackgroundTested=false&algo=HSV&lang=es
export const visuallyDistinctColors = [
  "#2f4f4f",
  "#2e8b57",
  "#800000",
  "#808000",
  "#00008b",
  "#ff0000",
  "#ff8c00",
  "#ffd700",
  "#ba55d3",
  "#00ff7f",
  "#0000ff",
  "#adff2f",
  "#ff00ff",
  "#1e90ff",
  "#fa8072",
  "#dda0dd",
  "#ff1493",
  "#87cefa",
  "#7fffd4",
  "#ffdead",
];

export const tagToString: {
  [key in GameTag]: { label: string; color: string };
} = {
  [GameTag.Action]: {
    label: "Action",
    color: visuallyDistinctColors[0],
  },
  [GameTag.Board]: {
    label: "Board",
    color: visuallyDistinctColors[1],
  },
  [GameTag.Collectathon]: {
    label: "Collectathon",
    color: visuallyDistinctColors[2],
  },
  [GameTag.Cooperative]: {
    label: "Cooperative",
    color: visuallyDistinctColors[3],
  },
  [GameTag.Exploration]: {
    label: "Exploration",
    color: visuallyDistinctColors[4],
  },
  [GameTag.Idle]: {
    label: "Idle",
    color: visuallyDistinctColors[5],
  },
  [GameTag.Horror]: {
    label: "Horror",
    color: visuallyDistinctColors[6],
  },
  [GameTag.Metroidvania]: {
    label: "Metroidvania",
    color: visuallyDistinctColors[7],
  },
  [GameTag.MuchoTexto]: {
    label: "MuchoTexto",
    color: visuallyDistinctColors[8],
  },
  [GameTag.Platformer]: {
    label: "Platformer",
    color: visuallyDistinctColors[9],
  },
  [GameTag.Precision]: {
    label: "Precision",
    color: visuallyDistinctColors[10],
  },
  [GameTag.Programing]: {
    label: "Programing",
    color: visuallyDistinctColors[11],
  },
  [GameTag.PointAndClick]: {
    label: "Point & Click",
    color: visuallyDistinctColors[12],
  },
  [GameTag.Puzzles]: {
    label: "Puzzles",
    color: visuallyDistinctColors[13],
  },
  [GameTag.Roguelike]: {
    label: "Roguelike",
    color: visuallyDistinctColors[14],
  },
  [GameTag.RPG]: {
    label: "RPG",
    color: visuallyDistinctColors[15],
  },
  [GameTag.Rythm]: {
    label: "Rythm",
    color: visuallyDistinctColors[16],
  },
  [GameTag.TowerDefense]: {
    label: "Tower Defense",
    color: visuallyDistinctColors[17],
  },
  [GameTag.TurnBased]: {
    label: "TurnBased",
    color: visuallyDistinctColors[18],
  },
};

export const Tags = ({ tags }: { tags: Array<GameTag> }) => {
  return (
    <Row gutter={[8, 8]}>
      {tags.map((t) => (
        <Col key={t}>
          <Tag color={tagToString[t].color}>
            {tagToString[t].label}
          </Tag>
        </Col>
      ))}
    </Row>
  );
};
