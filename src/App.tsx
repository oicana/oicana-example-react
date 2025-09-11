import './App.css';
import { LoadingScreen } from './LoadingContext.tsx';
import { Preview } from './Preview.tsx';
import { TemplateProvider } from './TemplateProvider.tsx';

function App() {
    return (
        <LoadingScreen>
            <TemplateProvider>
                <Preview />
            </TemplateProvider>
        </LoadingScreen>
    );
}

export default App;
