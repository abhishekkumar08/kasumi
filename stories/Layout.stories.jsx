import { BarChart3, CreditCard, Home, Settings, Wallet } from "lucide-react";
import { AppLayout, Card, CardDescription, CardTitle } from "../src/index.js";

export default {
  title: "Layout/AppLayout",
  component: AppLayout,
  parameters: { layout: "fullscreen" },
};

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Transactions", href: "/transactions", icon: Wallet },
  { name: "Cards", href: "/cards", icon: CreditCard },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const Shell = {
  render: () => (
    <div className="-m-6">
      <AppLayout
        appName="Gallery App"
        navigation={navigation}
        currentUser={{ displayName: "Asha Rao", email: "asha@example.com" }}
        onLogout={() => {}}
      >
        <Card padding="md">
          <CardTitle>Gallery App</CardTitle>
          <CardDescription>Sidebar from 1024px; top bar, bottom bar and drawer below it.</CardDescription>
        </Card>
      </AppLayout>
    </div>
  ),
};
