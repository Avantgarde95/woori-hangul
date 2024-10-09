import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { Fill, PageButton, Spacing } from "common/components/Common";
import Page from "common/components/Page";

const HomePage = () => {
  const router = useRouter();

  return (
    <Page backgroundColor="#f3f3f3">
      <Spacing height="32px" />
      <SmallTitle>한글날 기념</SmallTitle>
      <LargeTitle>다른 글자 찾기</LargeTitle>
      <Fill />
      <Logo src="/resources/church-logo.svg" />
      <Spacing height="32px" />
      <Description>2024 토스 한글날 이벤트를 따라했습니다.</Description>
      <Fill />
      <PageButton
        onClick={() => {
          router.push("/quiz");
        }}
      >
        시작하기
      </PageButton>
    </Page>
  );
};

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SmallTitle = styled.div`
  font-size: 16px;
`;

const LargeTitle = styled.div`
  font-size: 32px;
  font-weight: bold;

  animation: ${fadeInAnimation} 0.8s linear forwards;
`;

const Logo = styled.img`
  width: 180px;
  max-width: 80%;
`;

const Description = styled.div`
  font-size: 16px;
`;

export default HomePage;
