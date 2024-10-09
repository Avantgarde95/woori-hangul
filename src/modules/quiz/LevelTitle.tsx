import { ReactNode } from "react";
import { useTheme, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { LevelStatus } from "modules/quiz/Level";

interface TitleProps {
  level: number;
  levelStatus: LevelStatus;
}

const LevelTitle = ({ level, levelStatus }: TitleProps) => {
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

export default LevelTitle;
