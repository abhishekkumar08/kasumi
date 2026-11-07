import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Component } from "react";
import { COMPONENT_COPY } from "../constants/componentCopy.js";
import { Button } from "./Button.jsx";
import { Card } from "./Card.jsx";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.MODE === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    this.setState({ error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const showDetails =
      import.meta.env.MODE === "development" && this.state.error;

    return (
      <div className="material-canvas flex min-h-screen items-center justify-center p-4">
        <Card padding="md" className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-pill bg-error-subtle">
            <AlertTriangle
              aria-hidden="true"
              className="h-8 w-8 text-error-fg"
            />
          </div>
          <h1 className="mb-2 text-title-lg text-fg">
            {COMPONENT_COPY.ERROR_TITLE}
          </h1>
          <p className="mb-6 text-body text-fg-muted">
            {COMPONENT_COPY.ERROR_BODY}
          </p>

          {showDetails && (
            <div className="mb-6 rounded-control bg-surface-muted p-4 text-left">
              <h2 className="mb-2 text-label text-fg">
                {COMPONENT_COPY.ERROR_DETAILS}
              </h2>
              <p className="break-all font-mono text-caption text-error-fg">
                {this.state.error.toString()}
              </p>
              {this.state.errorInfo && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-caption text-fg-muted">
                    {COMPONENT_COPY.ERROR_STACK}
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap text-caption text-fg-muted">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" onClick={this.handleRetry}>
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              {COMPONENT_COPY.ERROR_RETRY}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={this.handleGoHome}
            >
              <Home aria-hidden="true" className="h-4 w-4" />
              {COMPONENT_COPY.ERROR_HOME}
            </Button>
          </div>
          <p className="mt-4 text-caption text-fg-muted">
            {COMPONENT_COPY.ERROR_SUPPORT}
          </p>
        </Card>
      </div>
    );
  }
}

export default ErrorBoundary;
