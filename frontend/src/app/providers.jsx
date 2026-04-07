import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";

const queryClient = new QueryClient();

export default function AppProviders() {
    return (
        <QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</QueryClientProvider>
    );
}