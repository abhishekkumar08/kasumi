import { useEffect, useState } from "react";
import { Minus, X } from "lucide-react";
import {
  AchievementBadge,
  Button,
  Calendar,
  EditorShell,
  FileTree,
  IconButton,
  LevelCard,
  QuizOption,
  QuizQuestion,
  Select,
  SplitView,
  TestResultList,
  TextSizeControl,
  Timer,
  VoteBox,
} from "../src/index.js";

export default { title: "Practice/Study and coding", component: SplitView };

const Pane = ({ title, children }) => (
  <div className="flex h-full flex-col gap-2 rounded-card border border-line bg-surface p-4">
    <h3 className="text-title text-fg">{title}</h3>
    <p className="text-body text-fg-muted">{children}</p>
  </div>
);

export const SplitViewStory = {
  name: "SplitView",
  render: () => (
    <div className="h-[28rem]">
      <SplitView
        startLabel="Problem"
        endLabel="Code"
        start={<Pane title="Two Sum">Given an array of integers, return indices of the two numbers that add up to a target.</Pane>}
        end={<Pane title="Editor">Drag the divider, or focus it and use the arrow keys. Narrow the window to see the switch.</Pane>}
      />
    </div>
  ),
};

const day = (n) => `2026-10-${String(n).padStart(2, "0")}`;
const statuses = ["done", "done", "partial", "missed", "rest", "done", "done", "done", "partial", "rest", "interview", "done"];

export const CalendarStory = {
  name: "Calendar",
  render: () => (
    <div className="max-w-sm">
      <Calendar
        today={day(16)}
        days={Array.from({ length: 27 }, (_, i) => ({
          date: day(i + 5),
          status: i + 5 < 16 ? statuses[i % statuses.length] : i + 5 === 20 ? "interview" : "upcoming",
        }))}
      />
    </div>
  ),
};

function TextSize() {
  const [size, setSize] = useState(16);
  return (
    <div className="flex flex-col gap-3">
      <TextSizeControl value={size} onChange={setSize} />
      <p className="text-fg" style={{ fontSize: size }}>Reading at {size}px.</p>
    </div>
  );
}
export const TextSizeStory = { name: "TextSizeControl", render: () => <TextSize /> };

export const QuizStates = {
  name: "QuizOption: states",
  render: () => (
    <div className="flex max-w-md flex-col gap-2">
      {["idle", "selected", "correct", "wrong", "dim"].map((state, i) => (
        <QuizOption key={state} index={i} state={state} disabled={state === "correct" || state === "wrong" || state === "dim"}>
          {state}
        </QuizOption>
      ))}
    </div>
  ),
};

export const QuizQuestionStory = {
  name: "QuizQuestion",
  render: () => (
    <div className="max-w-xl">
      <QuizQuestion
        meta="Question 2 of 8 · Closures"
        prompt="What does this log?"
        code={"for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i));\n}"}
        options={["0 1 2", "3 3 3", "undefined ×3", "It throws"]}
        answerIndex={1}
        explanation="var is function-scoped, so all three callbacks share one i, which is 3 by the time they run."
      />
    </div>
  ),
};

function Files() {
  const [files, setFiles] = useState(["Main.java", "ParkingLot.java", "Vehicle.java"]);
  const [active, setActive] = useState("Main.java");
  return (
    <div className="w-64">
      <FileTree
        files={files}
        active={active}
        onSelect={setActive}
        onAdd={(name) => {
          setFiles((f) => [...f, name]);
          setActive(name);
        }}
        onRename={(from, to) => {
          setFiles((f) => f.map((x) => (x === from ? to : x)));
          if (active === from) setActive(to);
        }}
        onDelete={(name) => {
          setFiles((f) => f.filter((x) => x !== name));
          if (active === name) setActive(files[0]);
        }}
      />
    </div>
  );
}
export const FileTreeStory = { name: "FileTree", render: () => <Files /> };

export const Gamification = {
  name: "LevelCard and AchievementBadge",
  render: () => (
    <div className="flex max-w-3xl flex-col gap-8">
      <LevelCard level={6} kicker="Level 6 · Sharp" title="Deal yourself in." progress={0.62} xpLabel="1,240 XP" nextLabel="260 to L7">
        208 problems across six tracks.
      </LevelCard>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AchievementBadge icon="🔥" name="On fire" description="A 7-day streak" earned />
        <AchievementBadge icon="🧠" name="Patterns" description="Solve one of every pattern" current={9} target={14} />
        <AchievementBadge icon="🏁" name="First blood" description="Your first accepted solution" earned />
        <AchievementBadge icon="🌙" name="Night owl" description="Solve after midnight" />
      </div>
    </div>
  ),
};

function Votes() {
  const [vote, setVote] = useState(0);
  return <VoteBox score={41 + vote} vote={vote} onVote={setVote} />;
}
export const VoteBoxStory = { name: "VoteBox", render: () => <Votes /> };

function Pomodoro() {
  const total = 25 * 60;
  const [seconds, setSeconds] = useState(total);
  const [running, setRunning] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    if (!running) return undefined;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 30)), 200);
    return () => clearInterval(id);
  }, [running]);
  if (compact) return <Timer compact seconds={seconds} onExpand={() => setCompact(false)} />;
  return (
    <div className="flex flex-wrap gap-4">
      <Timer
        className="w-64"
        label="Focus"
        meta="●●○○"
        seconds={seconds}
        total={total}
        running={running}
        onToggle={() => setRunning((r) => !r)}
        onReset={() => {
          setRunning(false);
          setSeconds(total);
        }}
        onSkip={() => setSeconds(0)}
        actions={
          <>
            <IconButton icon={Minus} label="Collapse" size="xs" onClick={() => setCompact(true)} />
            <IconButton icon={X} label="Hide" size="xs" />
          </>
        }
      />
      <Timer className="w-64" label="Break" tone="success" seconds={4 * 60 + 12} total={5 * 60} running onToggle={() => {}} />
      <Timer className="w-64" label="Interview" seconds={0} total={90 * 60} onToggle={() => {}} onReset={() => {}} />
    </div>
  );
}
export const TimerStory = { name: "Timer", render: () => <Pomodoro /> };

const cases = [
  { label: "Case 1", status: "pass", badge: "AC" },
  {
    label: "Case 2",
    status: "fail",
    badge: "WA",
    detail: (
      <>
        <div>Expected: [0,1]</div>
        <div>Got: [1,0]</div>
      </>
    ),
  },
  { label: "Case 3", status: "error", badge: "RE", detail: "TypeError: Cannot read properties of undefined" },
  { label: "Case 4", status: "timeout", badge: "TLE" },
  { label: "Case 5", status: "info", detail: "Output: 42" },
];
export const TestResults = { name: "TestResultList", render: () => <div className="max-w-md"><TestResultList cases={cases} /></div> };

export const Editor = {
  name: "EditorShell",
  render: () => (
    <div className="h-[26rem] max-w-3xl">
      <EditorShell
        toolbar={
          <Select fieldSize="sm" aria-label="Language" defaultValue="ts" className="w-32">
            <option value="ts">TypeScript</option>
            <option value="py">Python</option>
          </Select>
        }
        actions={
          <>
            <Button size="xs" variant="outline">Run</Button>
            <Button size="xs">Submit</Button>
          </>
        }
        output={<TestResultList cases={cases.slice(0, 2)} />}
      >
        <pre className="h-full overflow-auto bg-surface-subtle p-3 font-mono text-caption text-fg">{"function twoSum(nums: number[], target: number) {\n  // …\n}"}</pre>
      </EditorShell>
    </div>
  ),
};
