export type ProgressRecord = {
  userId: string;
  lessons: {
    [lessonId: string]: {
      lastBlockId: string;
      completedBlocks: string[];
      miniLesson: { watched: boolean; watchedAt?: string };
      controlCheck: { attempts: number; bestScore: number };
      quiz: { attempts: number; bestScore: number };
      oralCheck: { done: boolean; transcript?: string };
      timeSpentSec: number;
      updatedAt: string;
    }
  };
  badges: string[];
  totalScore: number;
}
