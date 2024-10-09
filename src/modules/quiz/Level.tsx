import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { Fill, PageButton } from "common/components/Common";
import LevelTitle from "modules/quiz/LevelTitle";
import Cell from "modules/quiz/Cell";

export type LevelCell = { text: string; isAnswer: boolean };
export type LevelTable = Array<Array<LevelCell>>;

export type LevelStatus = "Running" | "Success" | "Fail";

interface LevelProps {
  level: number;
  maxTime: number; // seconds.
  table: LevelTable;
  onNext: () => void;
}

const Level = ({ level, maxTime, table, onNext }: LevelProps) => {
  const [status, setStatus] = useState<LevelStatus>("Running");
  const router = useRouter();

  // 시간 다 되면 fail.
  useEffect(() => {
    if (status === "Running") {
      const timeoutID = setTimeout(() => {
        setStatus("Fail");
      }, maxTime * 1000);

      return () => {
        clearTimeout(timeoutID);
      };
    }
  }, [status]);

  // 다음 레벨 vs 처음으로.
  let pageButton: ReactNode = null;

  if (status === "Fail") {
    pageButton = (
      <PageButton
        onClick={() => {
          router.push("/");
        }}
      >
        처음으로
      </PageButton>
    );
  } else if (status === "Success") {
    pageButton = <PageButton onClick={onNext}>다음 레벨로!</PageButton>;
  }

  return (
    <>
      <Timer>
        <TimerBar
          style={{
            animationDuration: `${maxTime}s`,
            // 시간 안에 끝나면 타이머 멈춤.
            animationPlayState: status === "Running" ? "running" : "paused",
          }}
        />
      </Timer>
      <Header>
        <LevelTitle level={level} levelStatus={status} />
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
        {pageButton}
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

const Footer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 64px;
`;

export default Level;
