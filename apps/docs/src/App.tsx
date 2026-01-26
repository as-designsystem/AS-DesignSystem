import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Welcome from './pages/Welcome';
import Installation from './pages/Installation';
import HowToUse from './pages/HowToUse';
import SupportedPlatforms from './pages/SupportedPlatforms';
import Button from './pages/Button';
import ButtonGroup from './pages/ButtonGroup';
import IconButton from './pages/IconButton';
import ToolIcons from './pages/ToolIcons';
import Tab from './pages/Tab';
import Select from './pages/Select';
import Checkbox from './pages/Checkbox';
import Toggle from './pages/Toggle';
import TextInput from './pages/TextInput';
import NumberInput from './pages/NumberInput';
import TooltipPage from './pages/Tooltip';
import PanelStudyNamePage from './pages/PanelStudyName';
import PanelButtonPage from './pages/PanelButton';
import Modal from './pages/Modal';
import AppHeader from './pages/AppHeader';
import ProductPanel from './pages/ProductPanel';
import HomePageActionBar from './pages/HomePageActionBar';
import AboutTemplates from './pages/AboutTemplates';
import HomePageTemplate from './pages/HomePageTemplate';
import TextStyles from './pages/TextStyles';
import Colors from './pages/Colors';
import Icons from './pages/Icons';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fullscreen routes - outside Layout */}
        <Route path="/templates/home-page/fullscreen" element={<HomePageTemplate />} />

        {/* Main routes with Layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/getting-started/welcome" replace />} />
              <Route path="/getting-started/welcome" element={<Welcome />} />
              <Route path="/getting-started/installation" element={<Installation />} />
              <Route path="/getting-started/how-to-use" element={<HowToUse />} />
              <Route path="/getting-started/supported-platforms" element={<SupportedPlatforms />} />
              <Route path="/tokens/text-styles" element={<TextStyles />} />
              <Route path="/tokens/colors" element={<Colors />} />
              <Route path="/tokens/icons" element={<Icons />} />
              <Route path="/components" element={<Navigate to="/components/button" replace />} />
              <Route path="/components/button" element={<Button />} />
              <Route path="/components/button-group" element={<ButtonGroup />} />
              <Route path="/components/icon-button" element={<IconButton />} />
              <Route path="/components/tool-icons" element={<ToolIcons />} />
              <Route path="/components/tab" element={<Tab />} />
              <Route path="/components/select" element={<Select />} />
              <Route path="/components/checkbox" element={<Checkbox />} />
              <Route path="/components/toggle" element={<Toggle />} />
              <Route path="/components/text-input" element={<TextInput />} />
              <Route path="/components/number-input" element={<NumberInput />} />
              <Route path="/components/tooltip" element={<TooltipPage />} />
              <Route path="/components/panel-button" element={<PanelButtonPage />} />
              <Route path="/components/panel-study-name" element={<PanelStudyNamePage />} />
              <Route path="/composites" element={<Navigate to="/composites/modal" replace />} />
              <Route path="/composites/modal" element={<Modal />} />
              <Route path="/composites/app-header" element={<AppHeader />} />
              <Route path="/composites/product-panel" element={<ProductPanel />} />
              <Route path="/composites/home-page-action-bar" element={<HomePageActionBar />} />
              <Route path="/templates" element={<Navigate to="/templates/about" replace />} />
              <Route path="/templates/about" element={<AboutTemplates />} />
              <Route path="/templates/home-page" element={<HomePageTemplate />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

