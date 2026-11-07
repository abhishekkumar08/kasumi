import { Inbox } from "lucide-react";
import { Alert, Button, Card, EmptyState, ErrorState, Skeleton, Spinner, useNotifications } from "../src/index.js";

export default { title: "Feedback/Overview", component: Alert };

export const Alerts = {
  render: () => (
    <div className="max-w-xl space-y-3">
      {["success", "warning", "error", "info"].map((tone) => (
        <Alert key={tone} tone={tone} title={`${tone[0].toUpperCase()}${tone.slice(1)}`}>
          A {tone} message attached to what it is about.
        </Alert>
      ))}
    </div>
  ),
};

export const AlertWithAction = {
  render: () => (
    <div className="max-w-xl space-y-3">
      <Alert
        tone="success"
        action={
          <Button size="sm" variant="outline">
            Undo
          </Button>
        }
      >
        637 changes applied.
      </Alert>
      <Alert
        tone="warning"
        title="Titled alerts read from the top"
        action={
          <Button size="sm" variant="outline">
            Retry
          </Button>
        }
      >
        A longer explanation that can wrap onto a second line when the space runs out.
      </Alert>
    </div>
  ),
};

function ToastButtons() {
  const { notify } = useNotifications();
  return (
    <div className="flex flex-wrap gap-3">
      {["success", "warning", "error", "info"].map((tone) => (
        <Button key={tone} variant="outline" onClick={() => notify(`This is a ${tone} notification.`, tone)}>
          Show {tone} toast
        </Button>
      ))}
    </div>
  );
}
export const Toasts = { render: () => <ToastButtons /> };

export const Loading = {
  render: () => (
    <Card padding="md" className="max-w-md space-y-4">
      <div className="flex items-center gap-4">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
      <Skeleton className="w-3/4" />
      <Skeleton className="w-1/2" />
      <Skeleton className="h-24 rounded-card" />
    </Card>
  ),
};

export const Empty = {
  name: "EmptyState",
  render: () => (
    <Card className="max-w-lg">
      <EmptyState icon={Inbox} title="No transactions yet" description="Import a statement or add one by hand." action={<Button>Add transaction</Button>} />
    </Card>
  ),
};

export const ErrorStory = {
  name: "ErrorState",
  render: () => (
    <Card className="max-w-lg">
      <ErrorState message="The statements service didn't answer. Your data is safe." onRetry={() => {}} />
    </Card>
  ),
};
