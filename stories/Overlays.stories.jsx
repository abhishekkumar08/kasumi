import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button, Checkbox, Input, Modal, Popover, Tooltip } from "../src/index.js";

export default { title: "Overlays/Overview", component: Modal };

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete category"
        description="Transactions in this category move to Uncategorised."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <Input label="Note" />
      </Modal>
    </>
  );
}
export const ModalStory = { name: "Modal", render: () => <ModalDemo /> };

export const PopoverStory = {
  name: "Popover",
  render: () => (
    <div className="pb-48">
      <Popover
        label="Filters"
        trigger={
          <Button variant="outline">
            <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
            Filters
          </Button>
        }
      >
        <div className="w-60 space-y-3 p-3">
          <Checkbox label="Only uncategorised" />
          <Checkbox label="Hide transfers" defaultChecked />
        </div>
      </Popover>
    </div>
  ),
};

export const TooltipStory = {
  name: "Tooltip",
  render: () => (
    <div className="pt-10">
      <Tooltip content="Tooltips also open on keyboard focus">
        <Button variant="secondary">Hover or focus me</Button>
      </Tooltip>
    </div>
  ),
};
