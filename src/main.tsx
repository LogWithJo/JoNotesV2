/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import queryClient from './lib/react-query.ts';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from './components/ErrorFallback.tsx';

function AppContent() {
	const {reset} = useQueryErrorResetBoundary();
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
			<App />
		</ErrorBoundary>
	)
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<AppContent />
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>,
);
