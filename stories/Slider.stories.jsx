import { useState } from "react";
import { Slider } from "../src/index.js";

export default { title: "Forms/Slider", component: Slider };

function Field() {
  const [value, setValue] = useState(40);
  return <Slider label="Opacity" value={value} onChange={setValue} format={(v) => `${v}%`} className="max-w-xs" />;
}
export const FieldStory = { name: "Field", render: () => <Field /> };

function Media() {
  const [pos, setPos] = useState(65);
  const [committed, setCommitted] = useState(65);
  return (
    <div className="max-w-md space-y-2">
      <Slider variant="media" label="Change progress" value={pos} max={200} onChange={setPos} onCommit={setCommitted} valueText={`${pos} of 200 seconds`} />
      <p className="text-caption text-fg-muted">Committed at {committed}s</p>
    </div>
  );
}
export const MediaStory = { name: "Media (player bar)", render: () => <Media /> };
