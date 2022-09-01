import styled from '@emotion/styled';
import { useStore } from 'effector-react';
import { ElementView } from 'entities/element';
import { ElementType } from 'shared/api';
import { $choosedElement } from './model';

const ChoiceView = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

interface IElementButtonCardProps {
  isActive: boolean;
}

const ElementButtonCard = styled.div<IElementButtonCardProps>`
  margin-top: 15px;
  cursor: pointer;
  transform: ${(props) => (props.isActive ? 'translate(0, -10px)' : '')};
  background-color: ${(props) => (props.isActive ? '#FFE3DB' : 'transparent')};
  border-radius: 20px;
`;

interface IChooseElementProps {
  handleElementChoice: (el: ElementType) => void;
}

export const ChooseElement = ({ handleElementChoice }: IChooseElementProps) => {
  const choosedElement = useStore($choosedElement);
  return (
    <>
      {choosedElement === 'none' ? <h4>Please, choose element</h4> : <h4>You choosed:</h4>}
      <ChoiceView>
        <ElementButtonCard isActive={choosedElement === 'rock'} onClick={() => handleElementChoice('rock')}>
          <ElementView elementType="rock" />
        </ElementButtonCard>
        <ElementButtonCard isActive={choosedElement === 'paper'} onClick={() => handleElementChoice('paper')}>
          <ElementView elementType="paper" />
        </ElementButtonCard>
        <ElementButtonCard isActive={choosedElement === 'scissors'} onClick={() => handleElementChoice('scissors')}>
          <ElementView elementType="scissors" />
        </ElementButtonCard>
      </ChoiceView>
    </>
  );
};
