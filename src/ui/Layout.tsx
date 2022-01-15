import styled from "styled-components";

export const FlexSection = styled.div<{ gutter?: number; direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  gap: ${props => props.gutter || 20}px;
`