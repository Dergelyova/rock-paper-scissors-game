import styled from '@emotion/styled';
import { useState, FormEvent } from 'react';
import { playerModel } from 'entities/player';
import { Button } from 'shared/ui/button.style';

const StyledInput = styled.input`
  display: inline-block;
  outline: none;
  height: 30px;
  width: 150px;
  text-align: start;
  background-color: white;
  cursor: text;
  border: 1px solid #dadada;
  border-radius: 6px;
  margin-right: 10px;
`;

const StyledForm = styled.form`
  padding: 20px 50px;
  background-color: white;
`;

export const ChoosePlayerNameForm = () => {
  const [inputValue, setInputValue] = useState('');
  const handleNameSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    playerModel.nameChanged(inputValue);
  };
  return (
    <StyledForm onSubmit={handleNameSubmit}>
      <p>Hello, what is your name?</p>
      <StyledInput type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button type="submit">Save</Button>
    </StyledForm>
  );
};
