import { ReactNode } from "react";
import styled from "@emotion/styled";

interface PageProps {
  backgroundColor: string;
  children: ReactNode;
}

const Page = ({ backgroundColor, children }: PageProps) => (
  <Container>
    <Content style={{ backgroundColor }}>{children}</Content>
  </Container>
);

const maxPageWidth = 600;
const pageMargin = 0;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 100%;
  height: 100%;
  padding: ${pageMargin}px;
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 12px;

  color: ${({ theme }) => theme.color.primary};
  border-radius: 12px;

  @media screen and (min-width: ${maxPageWidth}px) {
    width: ${maxPageWidth - pageMargin * 2}px;
  }
`;

export default Page;
