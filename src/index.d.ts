// Type declarations for @kasumi/ui. The package is written in JSX; these give
// TypeScript callers prop checking and autocomplete. Keep in step with the
// component signatures in src/components.
import type {
  ButtonHTMLAttributes,
  ComponentType,
  ElementType,
  ForwardRefExoticComponent,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  RefAttributes,
  SelectHTMLAttributes,
  TdHTMLAttributes,
  TextareaHTMLAttributes,
  ThHTMLAttributes,
} from "react";

type Icon = ElementType;
type Tone =
  "neutral" | "accent" | "outline" | "success" | "warning" | "error" | "info";
type StatusTone = "success" | "warning" | "error" | "info";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "success"
  | "link"
  | "default";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render the button styles on another element, e.g. a router Link. */
  as?: ElementType;
  /** Passed through to `as` (Link's `to`, anchor's `href`). */
  [key: string]: unknown;
  variant?: ButtonVariant;
  size?: "xs" | "sm" | "md" | "lg" | "icon" | "default";
  loading?: boolean;
}
export const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
>;

export interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: Icon;
  label: string;
  variant?: ButtonVariant;
  size?: "xs" | "sm" | "md" | "lg";
  /** Makes it a toggle: announced as aria-pressed, shown as on. */
  pressed?: boolean;
  /** Spinner in place of the icon; disabled while true. */
  loading?: boolean;
}
export const IconButton: ForwardRefExoticComponent<
  IconButtonProps & RefAttributes<HTMLButtonElement>
>;

interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Amber "check this" note; not aria-invalid. `error` wins if both. */
  warning?: ReactNode;
  containerClassName?: string;
  /** Decoration before the value: an icon, "₹". Not interactive. */
  leading?: ReactNode;
  /** After the value; may be a control, such as a clear button. */
  trailing?: ReactNode;
  /** Fixed 32px (sm) or 40px (md) height to line up with Buttons. Not on Textarea. */
  fieldSize?: "sm" | "md";
}
export const Input: ForwardRefExoticComponent<
  FieldProps &
    InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement>
>;
export const Select: ForwardRefExoticComponent<
  FieldProps &
    SelectHTMLAttributes<HTMLSelectElement> &
    RefAttributes<HTMLSelectElement>
>;
export const Textarea: ForwardRefExoticComponent<
  FieldProps &
    TextareaHTMLAttributes<HTMLTextAreaElement> &
    RefAttributes<HTMLTextAreaElement>
>;
export function FormField(props: {
  id?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  warning?: ReactNode;
  required?: boolean;
  className?: string;
  children: (fieldProps: Record<string, unknown>) => ReactNode;
}): JSX.Element;

interface ChoiceProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: ReactNode;
  description?: ReactNode;
}
export const Checkbox: ForwardRefExoticComponent<
  ChoiceProps & { indeterminate?: boolean } & RefAttributes<HTMLInputElement>
>;
export function Radio(props: ChoiceProps): JSX.Element;
export function RadioGroup(props: {
  legend?: ReactNode;
  name?: string;
  options: Array<{
    value: string;
    label: ReactNode;
    description?: ReactNode;
    disabled?: boolean;
  }>;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  className?: string;
}): JSX.Element;
export function Switch(
  props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: ReactNode;
    description?: ReactNode;
  }
): JSX.Element;

export const Card: ForwardRefExoticComponent<
  HTMLAttributes<HTMLElement> & {
    variant?: "default" | "glass";
    interactive?: boolean;
    /** Rings the card: a picked plan, a chosen option. */
    selected?: boolean;
    /** A status tint over the whole card. */
    tone?: StatusTone;
    padding?: "none" | "sm" | "md";
    as?: ElementType;
    [key: string]: unknown;
  } & RefAttributes<HTMLElement>
>;
type Slot = { children?: ReactNode; className?: string };
export function CardHeader(props: Slot): JSX.Element;
export function CardTitle(
  props: Slot & { as?: ElementType; icon?: Icon }
): JSX.Element;
export function CardDescription(
  props: Slot & { as?: ElementType }
): JSX.Element;
export function CardContent(props: Slot): JSX.Element;
export function CardFooter(props: Slot): JSX.Element;

export function Badge(
  props: Slot &
    HTMLAttributes<HTMLSpanElement> & {
      tone?: Tone;
      variant?: string;
      /** A categorical colour from the chart palette (1–8); wins over `tone`. */
      series?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      size?: "sm" | "md" | "lg" | "count";
    }
): JSX.Element;
export function Alert(
  props: Slot &
    HTMLAttributes<HTMLDivElement> & {
      tone?: StatusTone | "neutral";
      title?: ReactNode;
      action?: ReactNode;
      icon?: Icon;
      /** "inline": no box, tinted text under a field or result in a card. */
      variant?: "banner" | "inline";
    }
): JSX.Element;
export function Avatar(props: {
  /** Accessible name; omit for a decorative mark. */
  name?: string;
  src?: string;
  icon?: Icon;
  emoji?: string;
  tone?: ToneName;
  /** A data colour (e.g. a user's category colour), washed at 12%. */
  color?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}): JSX.Element;
export function Stat(props: {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  tone?: "success" | "error" | "warning" | "neutral";
  hint?: ReactNode;
  icon?: Icon;
  className?: string;
}): JSX.Element;
export function Spinner(props: {
  size?: "sm" | "md" | "lg" | "xl";
  label?: string;
  className?: string;
}): JSX.Element;
export function Skeleton(props: { className?: string }): JSX.Element;
export function Tooltip(props: {
  content: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  children: JSX.Element;
}): JSX.Element;
export function Tabs(props: {
  tabs: Array<{
    id: string;
    label: ReactNode;
    content: ReactNode;
    disabled?: boolean;
  }>;
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** "underline" for tabs inside a pane or card. */
  variant?: "segmented" | "underline";
  className?: string;
}): JSX.Element;
export function Modal(props: {
  open: boolean;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  /** "sheet": docked to the bottom on a phone, to the right from `sm`. */
  variant?: "dialog" | "sheet";
  className?: string;
  children?: ReactNode;
}): JSX.Element;

export function Table(
  props: Slot & { caption?: ReactNode; containerClassName?: string }
): JSX.Element;
export function TableHead(props: Slot): JSX.Element;
export function TableBody(props: Slot): JSX.Element;
export function TableRow(
  props: HTMLAttributes<HTMLTableRowElement> & { interactive?: boolean }
): JSX.Element;
export function TableHeader(
  props: ThHTMLAttributes<HTMLTableCellElement> & {
    numeric?: boolean;
    onSort?: () => void;
    sortDirection?: "asc" | "desc";
  }
): JSX.Element;
export function TableCell(
  props: TdHTMLAttributes<HTMLTableCellElement> & {
    numeric?: boolean;
    /** Secondary line under the cell's text (a merchant under a description). */
    description?: ReactNode;
  }
): JSX.Element;
export function TableEmpty(props: {
  colSpan: number;
  children?: ReactNode;
}): JSX.Element;

export function EmptyState(props: {
  /** An icon component, or a node such as an emoji. */
  icon?: Icon | ReactNode;
  /** "sm" inside a card; "md" for a page section. */
  size?: "sm" | "md";
  /** Heading level of the title; "h1" when the empty state is the page. */
  titleAs?: ElementType;
  title: ReactNode;
  description?: ReactNode;
  /** A click handler (shown as a Button labelled `actionLabel`) or an element. */
  action?: (() => void) | ReactNode;
  actionLabel?: ReactNode;
  className?: string;
}): JSX.Element;
type ToneName = "neutral" | "accent" | "success" | "warning" | "error" | "info";

export function ErrorState(props: {
  title?: ReactNode;
  message?: ReactNode;
  onRetry?: () => void;
  retryLabel?: ReactNode;
  className?: string;
}): JSX.Element;
export function StatCard(props: {
  label: ReactNode;
  value: ReactNode;
  delta?: ReactNode;
  tone?: "success" | "error" | "warning" | "neutral";
  hint?: ReactNode;
  icon?: Icon;
  iconTone?: ToneName;
  /** Status tint for the whole card. */
  tint?: StatusTone;
  variant?: "default" | "glass";
  className?: string;
  /** Passed to the Card: onClick, interactive, as, data-*. */
  [key: string]: unknown;
}): JSX.Element;
export function Progress(props: {
  value: number;
  max?: number;
  /** A step bar: one segment per step; `value` is how many are done. */
  steps?: number;
  /** A data colour for the bar (a chart series), instead of `tone`. */
  color?: string;
  label?: ReactNode;
  valueLabel?: string;
  tone?: Exclude<ToneName, "neutral">;
  size?: "sm" | "md";
  showValue?: boolean;
  className?: string;
  /** Names the bar when no visible `label` is given. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
}): JSX.Element;
export interface SegmentOption<V extends string = string> {
  value: V;
  label: ReactNode;
  icon?: Icon;
  disabled?: boolean;
}
export function SegmentedControl<V extends string = string>(props: {
  label: string;
  options: SegmentOption<V>[];
  value?: V;
  onChange?: (value: V) => void;
  className?: string;
}): JSX.Element;
export function Pagination(props: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  summary?: ReactNode;
  className?: string;
}): JSX.Element | null;
export function FileDropzone(props: {
  id?: string;
  label?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Same syntax as <input accept>: ".pdf,.csv", "image/*". */
  accept?: string;
  /** Opens the camera on phones. */
  capture?: "environment" | "user";
  multiple?: boolean;
  disabled?: boolean;
  icon?: Icon;
  onFiles?: (files: File[]) => void;
  className?: string;
  children?: ReactNode;
  /** Names the control when there is no visible `label`. */
  "aria-label"?: string;
}): JSX.Element;
export interface DatePreset {
  id: string;
  label: ReactNode;
  from: string;
  to: string;
}
export type RangeCalendarDayState = "available" | "disabled" | "end_only" | "no_end";

/** A month-grid picker for a start and end date. Values are "YYYY-MM-DD". */
export function RangeCalendar(props: {
  start?: string | null;
  end?: string | null;
  onChange?: (range: { start: string; end: string | null }) => void;
  /** Months shown side by side (one on narrow screens). */
  months?: number;
  /** Controlled first visible month, any date inside it. */
  month?: string;
  onMonthChange?: (monthStart: string) => void;
  /** Days before this are disabled. Defaults to today. */
  minDate?: string;
  getDayState?: (date: string) => RangeCalendarDayState;
  isValidEnd?: (start: string, date: string) => boolean;
  /** 0 = Sunday, 1 = Monday. */
  weekStartsOn?: 0 | 1;
  locale?: string;
  label?: string;
  stateLabels?: Partial<Record<"start" | "end" | "inRange" | RangeCalendarDayState, string>>;
  className?: string;
}): JSX.Element;

/** A small whole number picked with − and + buttons. */
export function Slider(props: {
  label: ReactNode;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  /** Shapes the shown value, e.g. (v) => `${v}%`. */
  format?: (value: number) => ReactNode;
  /** "media": a compact player bar (seek, volume); `label` becomes the accessible name. */
  variant?: "field" | "media";
  /** Fires once when the pointer or key is released (seek after a drag). */
  onCommit?: (value: number) => void;
  /** Media variant: spoken value for screen readers, e.g. "1:05 of 3:20". */
  valueText?: string;
  disabled?: boolean;
  className?: string;
}): JSX.Element;
export interface ColorOption {
  /** A CSS colour, or "transparent" (drawn as a slashed swatch). */
  value: string;
  label: string;
}
export function ColorSwatches(props: {
  label: ReactNode;
  colors: ColorOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Adds the native colour picker as a last swatch. */
  allowCustom?: boolean;
  className?: string;
}): JSX.Element;
export function NumberStepper(props: {
  label: ReactNode;
  description?: ReactNode;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  /** How the value is shown, e.g. 0 as "Any". */
  formatValue?: (value: number) => string;
  className?: string;
}): JSX.Element;

export function DateRange(props: {
  label?: ReactNode;
  from?: string;
  to?: string;
  onChange?: (range: { from: string; to: string }) => void;
  presets?: DatePreset[];
  min?: string;
  max?: string;
  fromLabel?: ReactNode;
  toLabel?: ReactNode;
  className?: string;
}): JSX.Element;
export type DateRangePreset =
  | "all_time"
  | "today"
  | "yesterday"
  | "last_7_days"
  | "last_30_days"
  | "this_month"
  | "last_month"
  | "this_year"
  | "last_year";
export interface DateRangeValue {
  preset: DateRangePreset | "custom";
  /** Inclusive "YYYY-MM-DD"; "" when open-ended. */
  from?: string;
  to?: string;
}
export function DateRangeSelect(props: {
  value?: DateRangeValue;
  /** Receives from/to resolved for presets too. */
  onChange?: (value: Required<DateRangeValue>) => void;
  presets?: DateRangePreset[];
  allowCustom?: boolean;
  label?: string;
  size?: "sm" | "md";
  locale?: string;
  align?: "start" | "end";
  className?: string;
}): JSX.Element;
export const DATE_RANGE_PRESETS: DateRangePreset[];
export function resolveDateRange(
  value: DateRangeValue,
  today?: Date
): { from: string; to: string };
/** Query bounds: start at midnight of `from`, end at midnight after `to`. */
export function dateRangeBounds(
  value: DateRangeValue,
  today?: Date
): { start: Date | null; end: Date | null };
export function formatDateRange(
  from: string,
  to: string,
  locale?: string
): string;
export function toISODate(date: Date): string;
export function Disclosure(props: {
  title: ReactNode;
  /** Before the title, e.g. an Avatar. */
  leading?: ReactNode;
  description?: ReactNode;
  /** Before the chevron: a status Badge, a count. */
  meta?: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  variant?: "card" | "plain";
  className?: string;
  children?: ReactNode;
}): JSX.Element;
export function Popover(props: {
  trigger: JSX.Element;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  toggleOnClick?: boolean;
  align?: "start" | "end";
  popupRole?: "dialog" | "menu" | "listbox";
  label?: string;
  className?: string;
  panelClassName?: string;
  /** "top" opens the panel above the trigger. */
  side?: "bottom" | "top";
}): JSX.Element;
export interface MenuItem {
  label: string;
  onSelect?: () => void;
  icon?: Icon;
  tone?: "danger";
  disabled?: boolean;
  /** A link item: `href`, or `as` (a router Link) + `to`. */
  href?: string;
  as?: ElementType;
  to?: string;
  /** Consecutive items with the same group sit under this heading. */
  group?: string;
}
export function Menu(props: {
  items: MenuItem[];
  label?: string;
  trigger?: JSX.Element;
  align?: "start" | "end";
  /** "top" opens the menu above the trigger. */
  side?: "bottom" | "top";
  /** Controlled open state, e.g. for a right-click menu. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}): JSX.Element;
export interface BarGraphSeries {
  /** The row field holding this series' values. */
  key: string;
  /** Legend and tooltip name. */
  label: string;
  /** Index into the theme's chart colours (defaults to the series position). */
  colorIndex?: number;
}
export function BarGraph<Row extends Record<string, unknown>>(props: {
  data: Row[];
  /** The row field naming each bar group (a month, a category). */
  categoryKey: string;
  series: BarGraphSeries[];
  /** "horizontal": columns along a category axis; "vertical": one row per category. */
  layout?: "horizontal" | "vertical";
  /** Defaults to 300, or 48px per row (+40) for vertical. */
  height?: number;
  /** Axis ticks and bar labels; keep it short. */
  valueFormatter?: (value: number) => string;
  /** Tooltip values; defaults to valueFormatter. */
  tooltipFormatter?: (value: number) => string;
  categoryFormatter?: (category: string) => string;
  /** Value at each bar's end; defaults to on for vertical. */
  showValues?: boolean;
  /** Width of the category axis in vertical layout. */
  categoryWidth?: number;
  /** Fires for a click anywhere in a row's band. */
  onSelect?: (row: Row) => void;
}): JSX.Element;
export function DonutGraph<Row extends Record<string, unknown>>(props: {
  data: Row[];
  nameKey?: string;
  valueKey?: string;
  height?: number;
  /** Tooltip value; the share is appended. */
  valueFormatter?: (value: number) => string;
  legendFormatter?: (name: string) => ReactNode;
  /** Fires for a slice or its legend entry. */
  onSelect?: (row: Row) => void;
}): JSX.Element;
export function ChartTooltip(props: {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: string | number;
    color?: string;
    dataKey?: string | number;
    payload?: { fill?: string };
  }>;
  label?: string | number;
  formatter?: (value: any, name: any) => ReactNode;
  labelFormatter?: (label: any) => ReactNode;
}): JSX.Element | null;
export function ChartLegendLabel(props: {
  children?: ReactNode;
  /** Series colour: draws a swatch before the label. */
  color?: string;
}): JSX.Element;
/** Whether a CSS media query matches, kept current as the window changes. */
export function useMediaQuery(query: string): boolean;
export function useChartTheme(): {
  colors: string[];
  grid: string;
  axis: string;
  cursor: string;
};

export function LoadingSpinner(props: {
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
  color?: string;
}): JSX.Element;
export function LoadingOverlay(props: { message?: string }): JSX.Element;
export function LoadingCard(props: { className?: string }): JSX.Element;
export function LoadingTable(props: {
  rows?: number;
  cols?: number;
}): JSX.Element;
export function LoadingPage(): JSX.Element;
export function PageHeader(props: {
  title: ReactNode;
  subtitle?: ReactNode;
  /** A BackLink above the title. */
  back?: ReactNode;
  /** Small label above the title, e.g. the product name. */
  eyebrow?: ReactNode;
  /** "display" for a landing-page hero. */
  size?: "headline" | "display";
  align?: "start" | "center";
  /** "sticky": a frosted band content scrolls under. Default: inline. */
  variant?: "inline" | "sticky";
  /** Sticky only. */
  showShadow?: boolean;
  className?: string;
  /** The page's one primary control; stays beside the title on a phone. */
  action?: ReactNode;
  /** Keep the subtitle on phones (hidden below 640px by default). */
  showSubtitleOnPhone?: boolean;
  /** Further controls: right of the title, or a second row on a phone. */
  children?: ReactNode;
}): JSX.Element;
export const ErrorBoundary: ComponentType<{ children?: ReactNode }>;

export function AuthShell(props: {
  appName: ReactNode;
  tagline: ReactNode;
  highlights?: Array<{ label: string; detail: ReactNode }>;
  icon?: Icon;
  /** A brand mark; replaces `icon`. */
  logo?: ReactNode;
  assurance?: ReactNode;
  children?: ReactNode;
}): JSX.Element;
export function CredentialsForm(props: {
  copy: Record<string, any>;
  busy?: boolean;
  error?: string;
  onSubmit: (
    values: { email: string; password: string; displayName: string },
    context: { signupMode: boolean }
  ) => unknown;
  onGoogle?: (() => void) | null;
  requireConfirm?: boolean;
}): JSX.Element;
export function AlreadySignedIn(props: {
  user: { displayName?: string | null; email?: string | null } | null;
  onContinue: () => void;
  onSignOut: () => Promise<unknown> | unknown;
  continueLabel?: string;
}): JSX.Element;
export function ThemeChoice(props: {
  title: string;
  description: ReactNode;
  lightLabel: ReactNode;
  darkLabel: ReactNode;
}): JSX.Element;
/** A named palette from `palettes`. */
export type PaletteId = "ace" | "pastel" | "aurora" | "one-dark-pro";
export function PaletteChoice(props: {
  /** Accessible name of the radio group. */
  label: string;
  /** Which palettes to offer, in order. Default: all of them. */
  ids?: PaletteId[];
  /** Also offer Kasumi's plain light and dark. */
  includeModes?: boolean;
  lightLabel?: ReactNode;
  darkLabel?: ReactNode;
  /** Controlled: the app's own palette store instead of ThemeProvider. */
  value?: PaletteId | null;
  onChange?: (palette: PaletteId) => void;
  className?: string;
}): JSX.Element;
export function AppSwitcher(props: {
  className?: string;
  showLabel?: boolean;
}): JSX.Element;
export function SupportChatbot(props: {
  appName: string;
  currentUser?: { displayName?: string | null; email?: string | null } | null;
  /** Controlled: the app opens it from elsewhere (a menu). Hides the launcher below 1024px. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}): JSX.Element;
export interface NavItem {
  name: string;
  href: string;
  icon?: Icon;
  onClick?: () => void;
  /** Sidebar: a heading shown above the first item of each section. */
  section?: string;
  /** Bottom bar: the one main action, drawn as a raised round button. */
  primary?: boolean;
}
interface ShellUser {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
  /** "ADMIN" also gets the support form (floating launcher and menu Help). */
  role?: string | null;
}
export function Sidebar(props: {
  appName: string;
  /** A brand mark before the app name. */
  logo?: ReactNode;
  navigation: NavItem[];
  /** A control above the navigation. */
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
}): JSX.Element;
export function UserMenu(props: {
  currentUser: ShellUser | null;
  onLogout: () => void;
  onThemeToggle: () => void;
  isDark: boolean;
  className?: string;
}): JSX.Element;
export function AppLayout(props: {
  appName: string;
  /** A brand mark beside the app name in the sidebar and phone header. */
  logo?: ReactNode;
  appKey?: string;
  navigation: NavItem[];
  children?: ReactNode;
  className?: string;
  showAppSwitcher?: boolean;
  customTopBar?: ReactNode;
  customBottomBar?: ReactNode;
  /** Bottom-bar tabs on phones. Default: the first five navigation items. */
  bottomNavigation?: NavItem[];
  currentUser?: ShellUser | null;
  onLogout?: (() => void) | null;
  /** A control above the sidebar navigation (an "Add" button, say). */
  sidebarAction?: ReactNode;
}): JSX.Element;
export function BottomBar(props: {
  navigation: NavItem[];
  /** Accessible name of the nav landmark. */
  label?: string;
  className?: string;
}): JSX.Element;
export function MobileTopBar(props: {
  appName: string;
  logo?: ReactNode;
  navigation?: NavItem[];
  currentUser?: ShellUser | null;
  onLogout?: (() => void) | null;
  onThemeToggle?: (() => void) | null;
  isDark?: boolean;
  showAppSwitcher?: boolean;
  /** Routes already on the bottom bar, left out of the menu. */
  tabs?: NavItem[];
  /** Adds a Help entry that opens the support form. */
  onHelp?: (() => void) | null;
}): JSX.Element;

export function NotificationProvider(props: {
  children?: ReactNode;
}): JSX.Element;
export function useNotifications(): {
  notify: (
    message: ReactNode,
    variant?: StatusTone,
    options?: { action?: { label: string; onClick: () => void } }
  ) => void;
  confirmAction: (options?: Record<string, unknown>) => Promise<boolean>;
  promptAction: (options?: Record<string, unknown>) => Promise<string | null>;
};

export function ThemeProvider(props: {
  children?: ReactNode;
  defaultTheme?: "light" | "dark";
  /** Glass (translucent, frosted) or solid surfaces. Persisted per app. */
  defaultMaterial?: "glass" | "solid";
  /** A named palette; it fixes light or dark. Persisted per app; `setTheme` leaves it. */
  defaultPalette?: PaletteId | null;
  storageKey?: string;
}): JSX.Element;
export function useTheme(): {
  theme: "light" | "dark";
  isDark: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  material: "glass" | "solid";
  setMaterial: (material: "glass" | "solid") => void;
  palette: PaletteId | null;
  setPalette: (palette: PaletteId | null) => void;
};

type LinkTarget = { href?: string; to?: string };

export function Chip(
  props: HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    selected?: boolean;
    count?: ReactNode;
    icon?: Icon;
    /** A router Link; pass `to` with it. */
    as?: ElementType;
    href?: string;
    /** Adds an × button: an active filter. */
    onRemove?: () => void;
    removeLabel?: string;
    [key: string]: unknown;
  }
): JSX.Element;

export interface BreadcrumbItem extends LinkTarget {
  label: ReactNode;
}
export function Breadcrumb(props: {
  items: BreadcrumbItem[];
  /** The router's Link, for items with `to`. */
  linkAs?: ElementType;
  className?: string;
}): JSX.Element;
export function BackLink(props: {
  children?: ReactNode;
  as?: ElementType;
  href?: string;
  className?: string;
  [key: string]: unknown;
}): JSX.Element;

export function SectionHeader(props: {
  title: ReactNode;
  icon?: Icon;
  count?: ReactNode;
  description?: ReactNode;
  /** Right-aligned: a "See all" link, a filter, a button. */
  action?: ReactNode;
  as?: ElementType;
  align?: "start" | "center";
  className?: string;
}): JSX.Element;

export function List(
  props: HTMLAttributes<HTMLUListElement> & { children?: ReactNode }
): JSX.Element;
export function ListRow(props: {
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  leading?: ReactNode;
  /** Outside the row's link/button: a value, a Menu. */
  trailing?: ReactNode;
  /** Below 640px, put `trailing` on its own line under the row. */
  stackOnPhone?: boolean;
  selected?: boolean;
  as?: ElementType;
  href?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: unknown;
}): JSX.Element;

export interface Command {
  id: string;
  label: string;
  onSelect: () => void;
  group?: string;
  icon?: Icon;
  /** Extra words to match: synonyms, the page it opens. */
  keywords?: string[];
  /** Shown as keys, e.g. ["⌘", "S"]. Display only: the app binds it. */
  shortcut?: string[];
  /** A short kind before the label ("Guide", "DSA"). */
  tag?: string;
  /** Muted context after the label. */
  meta?: string;
}
export function CommandPalette(props: {
  open: boolean;
  onClose: () => void;
  commands?: Command[];
  /** The app's own ranking: the commands to show for a query. */
  search?: (query: string) => Command[];
  placeholder?: string;
  emptyLabel?: ReactNode;
  /** A hint row under the results. */
  footer?: ReactNode;
  className?: string;
}): JSX.Element;

export function InlineConfirm(props: {
  children: ReactNode;
  onConfirm: () => void;
  question?: string;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  variant?: ButtonVariant;
  confirmVariant?: ButtonVariant;
  size?: "xs" | "sm" | "md";
  icon?: Icon;
  className?: string;
}): JSX.Element;

export function CodeBlock(props: {
  /** The raw text: copied, and counted for line numbers. */
  code: string;
  language?: string;
  lineNumbers?: boolean;
  copyable?: boolean;
  /** Highlighted nodes (text-code-* roles); defaults to `code`. */
  children?: ReactNode;
  className?: string;
}): JSX.Element;
export function Code(props: Slot): JSX.Element;
export function Kbd(props: Slot): JSX.Element;

export function Prose(props: Slot & { as?: ElementType }): JSX.Element;
export function Figure(props: Slot & { caption?: ReactNode }): JSX.Element;

export interface TocItem {
  /** The heading element's id. */
  id: string;
  label: ReactNode;
  level?: 2 | 3;
}
export function TableOfContents(props: {
  items: TocItem[];
  /** Controlled current heading; omitted, it tracks scrolling. */
  activeId?: string;
  title?: string;
  className?: string;
}): JSX.Element;

export function LoadMore(props: {
  shown: number;
  total: number;
  onLoadMore: () => void;
  loading?: boolean;
  label?: ReactNode;
  className?: string;
}): JSX.Element;

export interface TopNavLink extends LinkTarget {
  label: string;
  active?: boolean;
}
export function TopNav(props: {
  brand?: ReactNode;
  /** A link, or a group: `{ label, items }` opens as a dropdown. */
  items: Array<TopNavLink & { items?: TopNavLink[] }>;
  actions?: ReactNode;
  /** Accessible name of the nav landmark. Default "Main". */
  label?: string;
  linkAs?: ElementType;
  /** Below this breakpoint the links fold into one menu. Default "md". */
  collapseBelow?: "md" | "lg" | "xl";
  /** Span the window instead of the 7xl column. */
  fluid?: boolean;
  className?: string;
}): JSX.Element;

export interface AccordionItem {
  id: string;
  title: ReactNode;
  /** Inside the header button, before the chevron. */
  meta?: ReactNode;
  /** Beside the header button (a checkbox, a menu). */
  actions?: ReactNode;
  content: ReactNode;
  /** Passed to the header button, e.g. data-testid. */
  triggerProps?: Record<string, unknown>;
}
export function Accordion(props: {
  items: AccordionItem[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (id: string) => void;
  headingAs?: ElementType;
  className?: string;
}): JSX.Element;
export interface SelectMenuOption {
  value: string;
  label: string;
}
export function SelectMenu(props: {
  value?: string;
  onChange?: (value: string) => void;
  options: Array<string | SelectMenuOption>;
  placeholder?: string;
  /** "sm"/"md": fixed toolbar heights. Omitted: the form height of Input and Select. */
  size?: "sm" | "md";
  /** Search box; defaults to on when there are more than 7 options. */
  searchable?: boolean;
  /** Adds "Create “text”"; return the new option's value (or undefined to stay put). */
  onCreate?: (text: string) => Promise<string | undefined> | string | undefined;
  align?: "start" | "end";
  disabled?: boolean;
  /** A visible field label (as on Input/Select); also names the trigger. */
  label?: string;
  hint?: ReactNode;
  className?: string;
  "aria-label"?: string;
}): JSX.Element;
export function LoadingState(props: {
  title: ReactNode;
  description?: ReactNode;
  steps?: string[];
  className?: string;
}): JSX.Element;
/** Rupees in words, Indian system: 241097 → "Two lakh forty-one thousand ninety-seven rupees". */
export function amountInWords(value: number): string;
export function Amount(props: {
  value: number;
  currency?: string;
  locale?: string;
  /** "auto": − for negatives; "always": + / −; "none": magnitude only. */
  sign?: "none" | "auto" | "always";
  /** "auto": money in success, money out error. */
  tone?: "neutral" | "auto";
  trendIcon?: boolean;
  /** A muted line under the figure, e.g. the amount in words. */
  caption?: ReactNode;
  /**
   * Spell the amount out under the figure, the Indian way ("Two lakh
   * forty-one thousand ninety-seven rupees"), for headline figures.
   */
  words?: boolean;
  /** Fraction digits. Default 2; 0 for headline totals. */
  decimals?: number;
  className?: string;
}): JSX.Element;
export function Fieldset(props: {
  legend: ReactNode;
  description?: ReactNode;
  variant?: "plain" | "card";
  className?: string;
  children?: ReactNode;
}): JSX.Element;
export interface ChoiceOption {
  value: string;
  /** Accessible name. */
  label: string;
  /** What shows, e.g. an emoji; defaults to label. */
  display?: ReactNode;
  /** Renders a colour swatch. */
  color?: string;
}
export function ChoiceGrid(props: {
  label: ReactNode;
  options: ChoiceOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}): JSX.Element;
export function DescriptionList(props: {
  items: Array<{ label: string; value: ReactNode }>;
  layout?: "inline" | "stacked";
  className?: string;
}): JSX.Element;
export function TextLink(props: {
  children?: ReactNode;
  as?: ElementType;
  href?: string;
  className?: string;
  [key: string]: unknown;
}): JSX.Element;

// Constants and tokens: re-exported from source so callers get the exact
// inferred shapes (spreading AUTH_COPY keeps every key).
export {
  chart,
  color,
  elevation,
  fontFamily,
  glass,
  motion,
  radius,
  typography,
  zIndex,
} from "./theme/tokens.js";
export { semanticSpacing, spacingScale } from "./theme/spacing.js";
export { AUTH_COPY } from "./constants/authCopy.js";
export { APPEARANCE_COPY } from "./constants/appearanceCopy.js";
export { COMPONENT_COPY, SUPPORT_COPY } from "./constants/componentCopy.js";
export function cn(...inputs: unknown[]): string;

/** Two panes, side by side from `lg` (a draggable divider), one at a time below it. */
export function SplitView(props: {
  start: ReactNode;
  end: ReactNode;
  /** Names of the panes on the phone switch. */
  startLabel: ReactNode;
  endLabel: ReactNode;
  /** Accessible name of the phone switch. */
  label?: string;
  resizeLabel?: string;
  /** Start pane width in percent (default 50). */
  defaultSize?: number;
  /** Smallest width either pane can be dragged to, in percent (default 25). */
  minSize?: number;
  resizable?: boolean;
  className?: string;
}): JSX.Element;

export type DayStatus =
  "done" | "partial" | "missed" | "rest" | "interview" | "upcoming";
export interface CalendarDay {
  /** YYYY-MM-DD. */
  date: string;
  status: DayStatus;
  /** Extra words for the day's name ("Mock with Priya"). */
  label?: string;
}
export function Calendar(props: {
  days: CalendarDay[];
  /** YYYY-MM-DD; ringed. */
  today?: string;
  label?: string;
  /** Seven headings, Monday first. */
  weekdays?: string[];
  statusLabels?: Partial<Record<DayStatus, string>>;
  todayLabel?: string;
  className?: string;
}): JSX.Element;

export function TextSizeControl(props: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** What the value button resets to. */
  defaultValue?: number;
  label?: string;
  smallerLabel?: string;
  biggerLabel?: string;
  resetLabel?: (value: number) => string;
  className?: string;
}): JSX.Element;

export type QuizOptionState = "idle" | "selected" | "correct" | "wrong" | "dim";
export function QuizOption(
  props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    /** 0-based: shown as A, B, C… */
    index: number;
    state?: QuizOptionState;
    children?: ReactNode;
  }
): JSX.Element;
export function QuizQuestion(props: {
  meta?: ReactNode;
  prompt: ReactNode;
  /** A snippet shown under the prompt. */
  code?: string;
  options: ReactNode[];
  answerIndex: number;
  explanation?: ReactNode;
  onAnswer?: (correct: boolean) => void;
  correctLabel?: ReactNode;
  wrongLabel?: ReactNode;
  answersLabel?: string;
  className?: string;
}): JSX.Element;

export function FileTree(props: {
  files: string[];
  /** The open file. */
  active?: string;
  onSelect: (name: string) => void;
  onAdd?: (name: string) => void;
  onRename?: (from: string, to: string) => void;
  onDelete?: (name: string) => void;
  label?: string;
  addLabel?: string;
  renameLabel?: (name: string) => string;
  deleteLabel?: (name: string) => string;
  nameLabel?: string;
  className?: string;
}): JSX.Element;

export function AchievementBadge(props: {
  /** An emoji or icon node. */
  icon: ReactNode;
  name: ReactNode;
  description?: ReactNode;
  earned?: boolean;
  /** Progress toward a locked badge. */
  current?: number;
  target?: number;
  lockedLabel?: string;
  className?: string;
}): JSX.Element;
export function LevelCard(props: {
  level: number;
  suit?: ReactNode;
  kicker?: ReactNode;
  title?: ReactNode;
  /** The title's element; "h1" when the card heads the page. Default "h2". */
  titleAs?: ElementType;
  children?: ReactNode;
  /** 0–1 through the current level. */
  progress: number;
  xpLabel?: ReactNode;
  nextLabel?: ReactNode;
  className?: string;
}): JSX.Element;

export type Vote = -1 | 0 | 1;
export function VoteBox(props: {
  score: number;
  vote?: Vote;
  onVote: (vote: Vote) => void;
  busy?: boolean;
  upLabel?: string;
  downLabel?: string;
  className?: string;
}): JSX.Element;

/** Seconds as "mm:ss", or "h:mm:ss" from an hour up. */
export function formatClock(seconds: number): string;
export function Timer(props: {
  /** Seconds left. */
  seconds: number;
  /** The phase length, for the elapsed bar. */
  total?: number;
  running?: boolean;
  label?: ReactNode;
  meta?: ReactNode;
  /** "success" for a break. */
  tone?: "accent" | "success";
  /** The clock alone, as a button that calls `onExpand`. */
  compact?: boolean;
  onToggle?: () => void;
  onReset?: () => void;
  onSkip?: () => void;
  onExpand?: () => void;
  /** Header actions (collapse, close). */
  actions?: ReactNode;
  startLabel?: ReactNode;
  pauseLabel?: ReactNode;
  resetLabel?: ReactNode;
  skipLabel?: ReactNode;
  doneLabel?: ReactNode;
  className?: string;
}): JSX.Element;

export type TestStatus = "pass" | "fail" | "error" | "timeout" | "info";
export interface TestCase {
  id?: string | number;
  label: ReactNode;
  status: TestStatus;
  /** Replaces the status word (a verdict code like "WA"). */
  badge?: ReactNode;
  /** Expected vs got, stderr: opens under the row. */
  detail?: ReactNode;
}
export function TestResultList(props: {
  cases: TestCase[];
  label?: string;
  statusLabels?: Partial<Record<TestStatus, string>>;
  className?: string;
}): JSX.Element;

export function EditorShell(props: {
  /** Left of the toolbar: a language picker. */
  toolbar?: ReactNode;
  /** Right of the toolbar: Run, Submit. */
  actions?: ReactNode;
  /** The editor. */
  children: ReactNode;
  /** A console under the editor. */
  output?: ReactNode;
  className?: string;
}): JSX.Element;
