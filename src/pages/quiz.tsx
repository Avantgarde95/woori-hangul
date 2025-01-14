import { useState } from "react";
import { GetServerSideProps } from "next";
import { random, sample, sampleSize } from "lodash";

import Page from "common/components/Page";
import allAnswers from "common/models/AllAnswers";
import Level, { LevelCell, LevelTable } from "modules/quiz/Level";
import Success from "modules/quiz/Success";

function generateQuiz(levels: Array<{ dimensionX: number; dimensionY: number }>) {
  const pickedAnswers = sampleSize(allAnswers, levels.length);
  const levelTables: Array<LevelTable> = [];

  // For each level...
  for (let i = 0; i < levels.length; i++) {
    const originalText = pickedAnswers[i].original;
    const answerText = sample(pickedAnswers[i].variations) ?? pickedAnswers[i].variations[0];
    const answerX = random(0, levels[i].dimensionX - 1, false);
    const answerY = random(0, levels[i].dimensionY - 1, false);
    const table: LevelTable = [];

    // For each row...
    for (let y = 0; y < levels[i].dimensionY; y++) {
      const row: Array<LevelCell> = [];

      // For each cell...
      for (let x = 0; x < levels[i].dimensionX; x++) {
        if (x === answerX && y === answerY) {
          row.push({ text: answerText, isAnswer: true });
        } else {
          row.push({ text: originalText, isAnswer: false });
        }
      }

      table.push(row);
    }

    levelTables.push(table);
  }

  return levelTables;
}

interface QuizPageProps {
  levelTables: Array<LevelTable>;
}

const QuizPage = ({ levelTables }: QuizPageProps) => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const isFinished = currentLevel >= levelTables.length;

  return !isFinished ? (
    <Page backgroundColor="#e2e2e2">
      <Level
        key={currentLevel} // 컴포넌트 풀 리셋하는 hack.
        level={currentLevel}
        maxTime={4}
        table={levelTables[currentLevel]}
        onNext={() => {
          setCurrentLevel(currentLevel + 1);
        }}
      />
    </Page>
  ) : (
    <Success />
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  // 랜덤한 데이터 - 서버에서 생성.
  // 클라에서 생성 시 mismatch 에러 발생.
  // https://velog.io/@kingth/Next.js-getStaticProps-vs-getServerSideProps
  const levelTables = generateQuiz([
    { dimensionX: 2, dimensionY: 2 },
    { dimensionX: 2, dimensionY: 3 },
    { dimensionX: 3, dimensionY: 3 },
    { dimensionX: 3, dimensionY: 4 },
    { dimensionX: 4, dimensionY: 4 },
  ]);

  return {
    props: {
      levelTables,
    },
  };
};

export default QuizPage;
