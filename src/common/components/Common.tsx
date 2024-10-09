import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

import { buttonFix } from "common/styles/Common";

interface SpacingProps {
  width?: string;
  height?: string;
}

/**
 * Used for putting a space or margin.
 */
export const Spacing = styled("div", {
  shouldForwardProp: props => props !== "width" && props !== "height",
})<SpacingProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

/**
 * Used for filling the remaining space in a flexbox.
 * - ex. `<A/><Fill/><B/>` -> `A` is aligned left and `B` is aligned right.
 */
export const Fill = styled.div`
  flex: 1;
`;

type HandleChangeInput = (event: ChangeEvent<HTMLInputElement>) => void;

/**
 * Implements frequently used pattern for <input>.
 */
export function useInput(defaultValue: string): [string, HandleChangeInput, Dispatch<SetStateAction<string>>] {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return [value, handleChangeValue, setValue];
}

const buttonAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const PageButton = styled.button`
  ${buttonFix}

  box-sizing: border-box;

  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme.color.background};
  background-color: ${({ theme }) => theme.color.primary};

  animation: ${buttonAnimation} 0.3s linear forwards;

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.color.highlight};
  }
`;
