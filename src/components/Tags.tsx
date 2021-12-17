import { Col, Row } from "antd";
import styled from 'styled-components'
import { GameTag } from "../data";

const Tag = styled.div<{ colorH: number }>`
    ${(props) => `
        color: hsla(${props.colorH}, 100%, 30%, 1);
        border: 2px solid hsla(${props.colorH}, 100%, 40%, 1);
        background: hsla(${props.colorH}, 100%, 40%, 0.2);
    `}
    font-weight: bold;
    border-radius: 20px;
    padding-left: 4px;
    padding-right: 4px;
`

export const tagToString: {[key in GameTag]: { label: string; color: number } } = {
    [GameTag.Action]: {
        label: "Action",
        color: 18,
    },
    [GameTag.Board]: {
        label: "Board",
        color: 36,
    },
    [GameTag.Collectathon]: {
        label: "Collectathon",
        color: 54,
    },
    [GameTag.Cooperative]: {
        label: "Cooperative",
        color: 72,
    },
    [GameTag.Exploration]: {
        label: "Exploration",
        color: 90,
    },
    [GameTag.Idle]: {
        label: "Idle",
        color: 108,
    },
    [GameTag.Horror]: {
        label: "Horror",
        color: 126,
    },
    [GameTag.Metroidvania]: {
        label: "Metroidvania",
        color: 144,
    },
    [GameTag.MuchoTexto]: {
        label: "MuchoTexto",
        color: 162,
    },
    [GameTag.Platformer]: {
        label: "Platformer",
        color: 180,
    },
    [GameTag.Precision]: {
        label: "Precision",
        color: 198,
    },
    [GameTag.Programing]: {
        label: "Programing",
        color: 216,
    },
    [GameTag.PointAndClick]: {
        label: "Point & Click",
        color: 234,
    },
    [GameTag.Puzzles]: {
        label: "Puzzles",
        color: 252,
    },
    [GameTag.Roguelike]: {
        label: "Roguelike",
        color: 270,
    },
    [GameTag.RPG]: {
        label: "RPG",
        color: 288,
    },
    [GameTag.Rythm]: {
        label: "Rythm",
        color: 306,
    },
    [GameTag.TowerDefense]: {
        label: "Tower Defense",
        color: 324,
    },
    [GameTag.TurnBased]: {
        label: "TurnBased",
        color: 342,
    },
}

export const Tags = ({ tags }: { tags: Array<GameTag> }) => {
  return (
    <Row gutter={[8, 8]}>
        {tags.map((t) => <Col key={t}>
            <Tag colorH={tagToString[t].color}>{tagToString[t].label}</Tag>
        </Col>)}
    </Row>
  );
};