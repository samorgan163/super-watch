import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/global.css';
import '@/styles/typography.css';
import '@/styles/reset.css';

import AppProviders from './app/providers';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppProviders />
	</StrictMode>,
);
