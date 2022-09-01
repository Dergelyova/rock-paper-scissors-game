type ScoreViewProps = {
  score: {
    currentPlayerPoints: number;
    opponentPlayerPoints: number;
  };
};

export const ScoreView = ({ score }: ScoreViewProps) => {
  return (
    <h1>
      {score.currentPlayerPoints} : {score.opponentPlayerPoints}
    </h1>
  );
};
