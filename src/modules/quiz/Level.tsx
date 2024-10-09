import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { keyframes, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

import { Fill, PageButton, Spacing } from "common/components/Common";
import { buttonFix } from "common/styles/Common";

export type LevelCell = { text: string; isAnswer: boolean };
export type LevelTable = Array<Array<LevelCell>>;

type LevelStatus = "Running" | "Success" | "Fail";

interface LevelProps {
  level: number;
  maxTime: number; // seconds.
  table: LevelTable;
  onNext: () => void;
}

const Level = ({ level, maxTime, table, onNext }: LevelProps) => {
  const [status, setStatus] = useState<LevelStatus>("Running");
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (status === "Running") {
      const handler = () => {
        setStatus("Fail");
      };

      const timeoutID = setTimeout(handler, maxTime * 1000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [status]);

  return (
    <>
      <Timer>
        <TimerBar
          style={{
            animationDuration: `${maxTime}s`,
            animationPlayState: status === "Running" ? "running" : "paused",
          }}
        />
      </Timer>
      <Header>
        <Title level={level} levelStatus={status} />
      </Header>
      <GridArea>
        <Grid>
          {table.map((row, y) => (
            <Row key={y}>
              {row.map((cell, x) => (
                <Cell key={x} cell={cell} levelStatus={status} setLevelStatus={setStatus} />
              ))}
            </Row>
          ))}
        </Grid>
      </GridArea>
      <Footer>
        <Fill />
        {status === "Fail" && (
          <PageButton
            onClick={() => {
              router.push("/");
            }}
          >
            처음으로
          </PageButton>
        )}
        {status === "Success" && <PageButton onClick={onNext}>다음 레벨로!</PageButton>}
      </Footer>
    </>
  );
};

const timerAnimation = keyframes`
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
`;

const Timer = styled.div`
  width: 100%;
  height: 16px;
  border-radius: 4px;
  overflow: hidden;
`;

const TimerBar = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.highlight};
  transform-origin: left;

  animation-name: ${timerAnimation};
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 64px;
`;

interface TitleProps {
  level: number;
  levelStatus: LevelStatus;
}

const Title = ({ level, levelStatus }: TitleProps) => {
  const theme = useTheme();

  let statusText: ReactNode = null;

  if (levelStatus === "Success") {
    statusText = <TitleStatus style={{ color: theme.color.right }}>성공</TitleStatus>;
  } else if (levelStatus === "Fail") {
    statusText = <TitleStatus style={{ color: theme.color.wrong }}>실패</TitleStatus>;
  }

  return (
    <TitleText>
      레벨 {level + 1} {statusText}
    </TitleText>
  );
};

const TitleText = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const titleAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const TitleStatus = styled.span`
  animation: ${titleAnimation} 0.3s linear forwards;
`;

const GridArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  flex: 1;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  height: 100%;
  max-width: 280px;
  max-height: 480px;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 4px;
`;

interface CellProps {
  cell: LevelCell;
  levelStatus: LevelStatus;
  setLevelStatus: (value: LevelStatus) => void;
}

const Cell = ({ cell, levelStatus, setLevelStatus }: CellProps) => {
  const theme = useTheme();
  const [borderColor, setBorderColor] = useState<string>("transparent");
  const disable = levelStatus !== "Running";

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

const Footer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 64px;
`;

export default Level;
