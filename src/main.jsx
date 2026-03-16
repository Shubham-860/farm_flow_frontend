import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "@fontsource/inter";
import {BrowserRouter} from "react-router";
import {ThemeProvider} from "@/components/ui/theme-provider.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="vite-ui-theme"
        >
            <App/>
        </ThemeProvider>
    </BrowserRouter>,
)
