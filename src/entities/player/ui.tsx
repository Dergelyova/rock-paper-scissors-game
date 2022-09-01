import styled from '@emotion/styled';
import { IPlayer } from './model';

interface ICardProps {
  isDisabled: boolean;
}

const Card = styled.div<ICardProps>`
  position: relative;
  display: block;
  width: 200px;
  height: 80px;
  padding: 20px;
  align-items: center;
  background-color: ${(props) => (props.isDisabled ? '#DADADA' : '#B4B7FF')};
  border-radius: 15px;
  color: ${(props) => (props.isDisabled ? 'black' : 'white')}; ;
`;

interface ICardChipProps {
  status: 'in game' | 'not in game' | 'made choice';
}

const CardChip = styled.p<ICardChipProps>`
  font-size: 0.5rem;
  text-transform: uppercase;
  font-weight: 300;
  padding: 4px;
  border-radius: 300px;
  background-color: ${(props) => (props.status === 'not in game' ? 'transparent' : 'white')};
  position: absolute;
  bottom: 5%;
  right: 5%;
  color: ${(props) => (props.status === 'not in game' ? 'inherit' : '#8055c2')};
`;
interface IPlayerCardProps {
  player: IPlayer;
}

export const PlayerCard = ({ player }: IPlayerCardProps) => {
  return (
    <Card isDisabled={player.status === 'not in game'}>
      <h3>{player.name}</h3>
      <CardChip status={player.status}>{player.status}</CardChip>
    </Card>
  );
};
