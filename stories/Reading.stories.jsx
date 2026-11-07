import { CheckCircle2, Info, Lightbulb, XCircle } from "lucide-react";
import { Alert, Card, Code, CodeBlock, Figure, Kbd, Prose } from "../src/index.js";

export default { title: "Reading/Overview", component: Prose };

const sample = `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
`;

export const ProseStory = {
  name: "Prose",
  render: () => (
    <Prose>
      <h2 id="approach">Approach</h2>
      <p>
        Walk the array once and remember every number you have seen in a <Code>Map</Code>. For each
        number, the partner you need is <code>target - nums[i]</code>.
      </p>
      <ul>
        <li>One pass, so the work grows with the input.</li>
        <li>The map trades memory for speed.</li>
      </ul>
      <blockquote>Write the brute force first, then ask what it repeats.</blockquote>
      <Alert tone="info" icon={Lightbulb} title="Key idea">
        Store what you have seen, look up what you need.
      </Alert>
      <CodeBlock code={sample} language="javascript" lineNumbers />
      <p>
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search problems.
      </p>
    </Prose>
  ),
};

const Highlighted = () => (
  <>
    <span className="text-code-keyword">const</span> total ={" "}
    <span className="text-code-function">sum</span>([<span className="text-code-number">1</span>,{" "}
    <span className="text-code-number">2</span>]); <span className="text-code-comment">{"// 3"}</span>
    {"\n"}
    <span className="text-code-keyword">type</span> <span className="text-code-type">Plan</span> ={" "}
    <span className="text-code-string">"weekly"</span>;
  </>
);

export const CodeBlockStory = {
  name: "CodeBlock",
  render: () => (
    <Card padding="md" className="space-y-4">
      <CodeBlock code={'const total = sum([1, 2]); // 3\ntype Plan = "weekly";'} language="typescript">
        <Highlighted />
      </CodeBlock>
      <CodeBlock code="npm run check" copyable={false} />
    </Card>
  ),
};

export const Callouts = {
  name: "Callouts and inline notes",
  render: () => (
    <Card padding="md" className="space-y-3">
      <Alert tone="info" icon={Lightbulb} title="Key">Store what you have seen.</Alert>
      <Alert tone="success" icon={CheckCircle2} title="Good">Hash map lookup is O(1).</Alert>
      <Alert tone="error" icon={XCircle} title="Bad">Nested loops are O(n²).</Alert>
      <Alert tone="neutral" icon={Info} title="Note">Inputs are never empty.</Alert>
      <Alert variant="inline" tone="success" icon={CheckCircle2}>All 12 tests passed.</Alert>
      <Alert variant="inline" tone="error" icon={XCircle}>3 tests failed.</Alert>
    </Card>
  ),
};

export const FigureStory = {
  name: "Figure",
  render: () => (
    <Figure caption="The map after three steps." className="max-w-md">
      <div className="flex h-40 items-center justify-center bg-surface-muted text-body text-fg-muted">diagram</div>
    </Figure>
  ),
};
