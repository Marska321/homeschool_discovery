import { Component, type ReactNode, type ErrorInfo } from "react";
import { Link } from "react-router-dom";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-4xl">
                        ⚠️
                    </div>
                    <h1 className="font-serif text-3xl text-foreground">Something went wrong</h1>
                    <p className="mt-3 max-w-md text-muted-foreground">
                        We hit an unexpected error. Please try refreshing the page or navigating back home.
                    </p>
                    {this.state.error && (
                        <pre className="mt-4 max-w-lg overflow-auto rounded-lg border bg-muted p-4 text-left text-xs text-muted-foreground">
                            {this.state.error.message}
                        </pre>
                    )}
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                            Refresh Page
                        </button>
                        <Link
                            to="/"
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            onClick={() => this.setState({ hasError: false, error: null })}
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
