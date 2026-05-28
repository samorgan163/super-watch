import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router";

import { PwaProvider } from '../context/PwaContext';

const queryClient = new QueryClient();

export default function AppProviders() {
    return (
        <QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<PwaProvider>
					<Router />
				</PwaProvider>
			</BrowserRouter>
		</QueryClientProvider>
    );
}
