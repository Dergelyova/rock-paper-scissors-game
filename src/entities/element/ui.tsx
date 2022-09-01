import styled from '@emotion/styled';
import { ElementType } from 'shared/api';
import { Rock, Paper, Scissors } from 'shared/ui/assets';

const ElementStyled = styled.div`
  position: relative;
  display: flex;
  height: 210px;
  width: 150px;
  margin: 10px;
  & > svg {
    position: absolute;
    bottom: 0%;
    left: 0%;
    height: 200px;
  }
`;

const elements = {
  rock: <Rock />,
  paper: <Paper />,
  scissors: <Scissors />
};

type ElementViewProps = {
  elementType: ElementType;
};

export const ElementView = ({ elementType }: ElementViewProps) => {
  const elementPic = elements[elementType];
  return <ElementStyled>{elementPic}</ElementStyled>;
};
