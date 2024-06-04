import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import { AppBar } from './AppBar';
import { Greet } from './Greet';
import { useUpdateStoreWithPreloadedData } from './helpers';
import { Login, Signup } from './Login';
import { Review } from './Review';
import { ReviewSpecialty, ReviewStart } from './ReviewSpecialty';
import { SummaryWriter } from './SummaryWriter';
import { SummaryWriterList } from './SummaryWriterList';
import { Translations } from './Translations';
import { Translator } from './Translator';

export function App() {
    useUpdateStoreWithPreloadedData();

    return (
        <>
            <AppBar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Greet />} />
                    <Route path="/translations" element={<Translations />} />
                    <Route
                        path="/translator/:chartId/:language"
                        element={<Translator />}
                    />
                    <Route path="/translations" element={<Translations />} />
                    <Route path="/summarise/:id" element={<SummaryWriter />} />
                    <Route path="/summaries" element={<SummaryWriterList />} />
                    <Route
                        path="/review/:specialty/:language/*"
                        element={<ReviewStart />}
                    />
                    <Route
                        path={'/review/:specialty/:language/:no'}
                        element={<ReviewSpecialty />}
                    />
                    <Route path="/review" element={<Review />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </>
    );
}
