export type ElementType = 'rock' | 'paper' | 'scissors';
export type RoundResultType = 'tie' | 'win' | 'loss';

export interface IResultResponse {
  results: { username: string; choice: ElementType }[];
}
