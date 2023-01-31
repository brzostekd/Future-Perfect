import { ObjectId } from "bson";
type GoalModalProps = {
  header: string;
  initialValues: Goal;
  onSubmit: (values: Goal) => void;
};
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
  // tasks_count: number;
  // tasks_done_count: number;
  color: string;
  tasks: Task[];
  is_current: boolean;
};

type Task = {
  id: ObjectId;
  // goal_id: ObjectId;
  name: string;
  created_at: Date;
  status: STATUS;
  priority: number;
};

type Timer = (
  | {
      started_at: Date;
      ends_at: Date;
    }
  | {
      started_at: null;
      ends_at: null;
    }
) & {
  task_id: ObjectId;
  goal_id: ObjectId;
  paused_at: Date | null;
  pattern_step: number;
  pattern: number[];
};
// type newGoal = { goalName: string; tasks: Task[] };
export { STATUS };
export type { Board, Task, Goal, Timer, GoalModalProps };
