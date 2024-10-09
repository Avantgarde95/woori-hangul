import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { Fill, PageButton, Spacing } from "common/components/Common";
import Page from "common/components/Page";

const Success = () => {
  const router = useRouter();

  return (
    <Page backgroundColor="#f4f4f4">
      <Spacing height="32px" />
      <Title>모든 레벨을 클리어했습니다!</Title>
      <Fill />
      <Icon src="/resources/success.svg" />
      <Fill />
      <PageButton
        onClick={() => {
          router.push("/");
        }}
      >
        처음으로
      </PageButton>
    </Page>
  );
};

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Icon = styled.img`
  width: 120px;
  transform: rotate(15deg);
  transform-origin: center;

  animation: ${fadeInAnimation} 0.8s linear forwards;
`;

export default Success;
