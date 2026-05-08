export type QuestDefinition = {
  id: string;
  title: string;
  description: string;
  stageObjectives: string[];
};

export type QuestState = {
  id: string;
  title: string;
  stage: number;
  objective: string;
};
