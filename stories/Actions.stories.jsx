import { Plus, Trash2 } from "lucide-react";
import { Button, IconButton } from "../src/index.js";

export default {
  title: "Actions/Button",
  component: Button,
  args: { children: "Save changes", variant: "primary", size: "md", loading: false, disabled: false },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "success", "link"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
};

export const Playground = {};

export const Variants = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {["primary", "secondary", "outline", "ghost", "destructive", "success", "link"].map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus aria-hidden="true" className="h-4 w-4" />
        Add transaction
      </Button>
      <Button variant="destructive">
        <Trash2 aria-hidden="true" className="h-4 w-4" />
        Delete
      </Button>
      <Button loading>Saving</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const Icon = {
  name: "IconButton",
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton icon={Plus} label="Add transaction" />
      <IconButton icon={Plus} label="Add transaction" variant="outline" />
      <IconButton icon={Trash2} label="Delete" variant="ghost" />
    </div>
  ),
};
