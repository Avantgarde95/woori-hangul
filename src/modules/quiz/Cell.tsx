import { useState, useEffect } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import { buttonFix } from "common/styles/Common";
import { LevelCell, LevelStatus } from "modules/quiz/Level";

interface CellProps {
  cell: LevelCell;
  levelStatus: LevelStatus;
  setLevelStatus: (value: LevelStatus) => void;
}

const Cell = ({ cell, levelStatus, setLevelStatus }: CellProps) => {
  const theme = useTheme();
  const [borderColor, setBorderColor] = useState<string>("transparent");
  const disable = levelStatus !== "Running";

  const textParts = [cell.text.substring(0, 2), cell.text.substring(2)];

  // 실패 시 정답 보여주기.
  useEffect(() => {
    if (levelStatus === "Fail" && cell.isAnswer) {
      setBorderColor(theme.color.right);
    }
  }, [levelStatus, cell.isAnswer, theme.color.right]);

  return (
    <CellButton
      disabled={disable}
      onClick={() => {
        if (disable) {
          return;
        }

        if (cell.isAnswer) {
          setLevelStatus("Success");
          setBorderColor(theme.color.right);
        } else {
          setLevelStatus("Fail");
          setBorderColor(theme.color.wrong);
        }
      }}
      style={{
        borderColor,
      }}
    >
      {textParts.map((part, i) => (
        <TextPart key={i}>{part}</TextPart>
      ))}
    </CellButton>
  );
};

const CellButton = styled.button`
  ${buttonFix}

  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;

  width: 100%;
  height: 100%;
  background-color: #ffffff;
  font-size: 20px;
  border-radius: 8px;
  border-width: 3px;
  border-style: solid;

  transition: border-color 1s;
`;

const TextPart = styled.span`
  display: inline-block;
`;

export default Cell;
