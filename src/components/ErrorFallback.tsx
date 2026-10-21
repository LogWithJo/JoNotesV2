import type { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error instanceof Error ? error.message : "error"}</pre>
			<button type="button" onClick={resetErrorBoundary}>
				Try again
			</button>
		</div>
	);
}

export default ErrorFallback;
