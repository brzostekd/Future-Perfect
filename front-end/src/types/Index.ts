import { ObjectId } from "bson";

enum STATUS {
  Pending,
  Current,
  Done,
}

type Board = {
  id: ObjectId;
  passcode: string;
  created_at: Date;
};

type Goal = {
  id: ObjectId;
  name: string;
  created_at: Date;
  board_id: ObjectId;
  tasks_count: number;
  tasks_done_count: number;
  color: string;
  tasks: Task[];
  is_current: boolean;
};

type Task = {
  id: ObjectId;
  goal_id: ObjectId;
  name: string;
  created_at: Date;
  status: STATUS;
  priority: number;
};

type Timer = {
  task_id: ObjectId;
  goal_id: ObjectId;
  started_at: Date;
  stopped_at: Date;
  pattern_step: number;
  pattern: number[];
};

export type { STATUS, Board, Task, Goal, Timer };
