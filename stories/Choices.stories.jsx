import { useState } from "react";
import { Checkbox, RadioGroup, Switch } from "../src/index.js";

export default { title: "Forms/Choices", component: Checkbox };

export const CheckboxStory = {
  name: "Checkbox",
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Recurring payment" description="Repeats every month on the same date." defaultChecked />
      <Checkbox label="Select all" indeterminate />
      <Checkbox label="Disabled" disabled />
    </div>
  ),
};

function Radios() {
  const [value, setValue] = useState("equal");
  return (
    <RadioGroup
      legend="Split"
      value={value}
      onChange={setValue}
      options={[
        { value: "equal", label: "Equally" },
        { value: "share", label: "By share", description: "Weights per person" },
        { value: "exact", label: "Exact amounts" },
      ]}
    />
  );
}
export const RadioGroupStory = { name: "RadioGroup", render: () => <Radios /> };

function Toggle() {
  const [on, setOn] = useState(true);
  return <Switch label="Spending alerts" description="Notify me when a budget passes 80%." checked={on} onChange={setOn} />;
}
export const SwitchStory = { name: "Switch", render: () => <Toggle /> };
