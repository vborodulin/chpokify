import React, { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';

import { Box, TBoxProps } from '@components/uiKit/Box';
import { InputContainer, TInputContainerProps } from '@components/uiKit/InputContainer';

import { detect } from '@lib/detect';

const StartAdornmentContainer = styled(Box)<TBoxProps>`
  left: ${({ theme }) => theme.space[4]};
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
`;

const EndAdornmentContainer = styled(Box)<TBoxProps>`
  position: absolute;
  right: ${({ theme }) => theme.space[4]};
  top: 50%;
  transform: translate3d(0, -50%, 0);
`;

type TContentProps = React.TextareaHTMLAttributes<any> & React.InputHTMLAttributes<any> & {
  startAdornment?: React.ReactNode,
  endAdornment?: React.ReactNode,
  multiline?: boolean
};

const multilineMixin = css`
  padding-bottom: ${({ theme }) => theme.space[2]};
  padding-top: ${({ theme }) => theme.space[2]};
  resize: vertical;
  white-space: pre-line;
`;

const StyledInput = styled.input<TContentProps>`
  background-color: ${({ theme }) => theme.colors.base.a_10};
  background-image: none;
  border: 2px solid ${({ theme }) => theme.colors.base.a_10};
  border-radius: ${({ theme }) => theme.radii[2]};
  box-shadow: none;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.font.normal};
  font-family: ${({ theme }) => theme.fontFamily[0]};
  font-size: ${({ theme }) => theme.fontSizes[2]};
  font-weight: ${({ theme }) => theme.fontWeights[0]};
  height: 100%;
  margin: 0;
  outline: none;
  overflow: ${({ multiline }) => (multiline ? 'auto' : 'hidden')};
  padding-left: ${({
    theme,
    startAdornment,
  }) => (startAdornment ? theme.space[12] : theme.space[4])};
  padding-right: ${({
    theme,
    endAdornment,
  }) => (endAdornment ? theme.space[12] : theme.space[4])};
  text-align: left;
  text-overflow: ellipsis;
  vertical-align: middle;
  white-space: normal;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.font.d_30};
  }

  &:not([disabled]):hover {
    background-color: ${({ theme }) => theme.colors.base.a_20};
    border-color: ${({ theme }) => theme.colors.base.a_20};
  }

  &:not([disabled]):focus {
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary.normal};
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.font.normal};
  }

  ${({ multiline }) => (multiline && multilineMixin)};
`;

export type TInputProps = TInputContainerProps & {
  inputRef?: React.Ref<any>;
  type?: string;
  title?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  minLength?: number
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  multiline?: boolean;
  isAutoResize?: boolean;
  maxAutoResize?: number;
  rows?: number;
};

const MAX_AUTO_RESIZE = 160;

const Input: React.FunctionComponent<TInputProps> = (props) => {
  const {
    inputRef,
    type = 'text',
    name,
    placeholder,
    value,
    defaultValue,
    startAdornment,
    endAdornment,
    disabled,
    autoComplete,
    autoFocus,
    onChange = () => {
    },
    onInput = () => {
    },
    required,
    minLength,
    maxLength,
    pattern,
    multiline,
    rows = 5,
    max,
    min,
    title,
    isAutoResize,
    maxAutoResize = MAX_AUTO_RESIZE,
    ...other
  } = props;

  const handleAutoResize = (element: React.ChangeEvent<HTMLInputElement>) => {
    if (element.target.scrollHeight >= maxAutoResize) {
      element.target.style.height = `${maxAutoResize}px`;
      return;
    }

    element.target.style.height = `${element.target.scrollHeight + 4}px`;
  };

  return (
    <InputContainer
      multiline={multiline}
      {...other}
    >
      <StartAdornmentContainer>
        {startAdornment}
      </StartAdornmentContainer>

      <StyledInput
        as={multiline ? 'textarea' : 'input'}
        ref={inputRef}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        autoComplete={autoComplete}
        autoFocus={detect.getIsTouchEnabled() ? false : autoFocus}
        onChange={onChange}
        onInput={isAutoResize ? handleAutoResize : onInput}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        required={required}
        minLength={minLength}
        max={max}
        min={min}
        maxLength={maxLength}
        pattern={pattern}
        rows={rows}
        multiline={multiline}
        title={title}
      />

      <EndAdornmentContainer>
        {endAdornment}
      </EndAdornmentContainer>
    </InputContainer>
  );
};

export {
  Input,
};
