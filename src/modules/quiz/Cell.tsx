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

  // 실패 시 정답 보여주기.
  useEffect(() => {
    if (levelStatus === "Fail" && cell.isAnswer) {
      setBorderColor(theme.color.right);
    }
  }, [levelStatus]);

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
      {cell.text}
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

export default Cell;
