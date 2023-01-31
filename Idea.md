## Future perfect - App that helps you plan your current day

**How does it work?**

1. On a landing user is prompted to create a board using a 12 letter passcode that they will use it in the future to access the board.
2. boards exist only for one day
3. User is presented with a blank dashboard
4. User can create a new goal.
   1. After interacting with a "create a goal" button, user is redirected to "create goal" page with a input for the name of the goal
   2. After clicking next, user is required to type in steps required to achieve their daily goal, and then sort them in the order of importance.
   3. After clicking done, user is taken to dashboard view
5. User can select a goal on which they want to work.
   1. User is presented with a current task and a timer
   2. Timer works in a style of "pomodoro timer". Amount of time for work <!-- and break can be set if the default does'nt fit users workflow. -->
   3. Until a task is not done, timer works in the cycle od work time -> break
   4. When a task is done, the next one is set to be the current task, and the one before it, is marked "done",
   <!-- 5. When a goal is reached, user is presented with the stats. (amount of work time, amount of break time, datetime of the start and the end and time elapsed and a colorfull graph of time spent working and taking brakes). -->

**Keep in mind**

- Make a working prototype as soon as possible,
- sanitization concenrns etc. can not be afforded to be taken care of (for now),
- no tests,
- no DB schema,
- don't get stuck at details, move quickly.
- don't overdo it

**Pages**

1. Landing page with an input for a passcode
2. app page

**Components**

1. passCode
2. goalBoard
3. goal
4. goalFAB
5. task
6. task_list
<!-- 5. Goal completion page -->

**Features**

1. Timer clock (simple)
2. Fancy clock (simple)
3. dashboard
4. goal board
5. goal editor

**data structures**

- STATUS ENUM

        {
            Pending,
            Current,
            Done
        }

- Board

        {
            id: ObjectId,
            passcode: string,
            created_at: Date,
        }

- Goal

        {
            id: ObjectId,
            name: string,
            created_at: Date,
            board_id: ObjectId,
            tasks_count: number
            tasks_done_count: number
            tasks: Task[],
            <!-- activity_history: board_history, -->
            is_current: boolean
        }

- Task

        {
            id: ObjectId,
            goal_id: ObjectId,
            name: string,
            created_at: Date,
            status: STATUS,
            priority: number
        }

<!-- - activity_history

        {
            id: ObjectId,
            created_at: Date,
            board: ObjectId,
            tracked_times: tracked_time[] =
            [
                {
                    type: "WORK" | "BREAK"
                    began_at: Date,
                    ended_at: Date,
                    task_id: ObjectId,
                    goal_id: ObjectId,
                },
            ]
        } -->

- Timer

        {
            task_id: ObjectId,
            goal_id: ObjectId,
            started_at: Date,
            stopped_at: Date,
            pattern_step : number,
            pattern: number[] = [
                60*15, # 15 minutes
                60*5,
            ]
        }



<Formik> is a component that helps you with building forms. It uses a render props pattern made popular by libraries like React Motion and React Router.

provides state itc.

<Form />
Form is a small wrapper around an HTML <form> element that automatically hooks into Formik's handleSubmit and handleReset. All other props are passed directly through to the DOM node.

Dom element makes submit work

<Field /> will automagically hook up inputs to Formik. It uses the name attribute to match up with Formik state. <Field /> will default to an HTML <input /> element.


<FieldArray /> is a component that helps with common array/list manipulations. You pass it a name property with the path to the key within values that holds the relevant array. <FieldArray /> will then give you access to array helper methods via render props. For convenience, calling these methods will trigger validation and also manage touched for you.