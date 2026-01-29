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
import SpinnerPage from './pages/Spinner';
import PanelSectionTitlePage from './pages/PanelSectionTitle';
import PanelGroupPage from './pages/PanelGroup';
import Modal from './pages/Modal';
import AppHeader from './pages/AppHeader';
import ProductBanner from './pages/ProductBanner';
import HomePageActionBar from './pages/HomePageActionBar';
import PanelHeaderPage from './pages/PanelHeader';
import LeftPanelPage from './pages/LeftPanel';
import AccordionPage from './pages/Accordion';
import StudyStatusBarPage from './pages/StudyStatusBar';
import AvatarPage from './pages/Avatar';
import WorkspacePage from './pages/Workspace';
import ToolTilePage from './pages/ToolTile';
import ChipPage from './pages/Chip';
import DropdownMenuPage from './pages/DropdownMenu';
import StudyStatusPage from './pages/StudyStatus';
import StudyRowPage from './pages/StudyRow';
import StudyTableHeaderPage from './pages/StudyTableHeader';
import AboutTemplates from './pages/AboutTemplates';
import HomePageTemplate from './pages/HomePageTemplate';
import LandingPageTemplate from './pages/LandingPageTemplate';
import CalendarPage from './pages/Calendar';
import TextStyles from './pages/TextStyles';
import Colors from './pages/Colors';
import Icons from './pages/Icons';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Fullscreen routes - outside Layout */}
        <Route path="/templates/home-page/fullscreen" element={<HomePageTemplate />} />
        <Route path="/templates/landing-page/fullscreen" element={<LandingPageTemplate />} />

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
              <Route path="/components/spinner" element={<SpinnerPage />} />
              <Route path="/components/panel-section-title" element={<PanelSectionTitlePage />} />
              <Route path="/components/panel-group" element={<PanelGroupPage />} />
              <Route path="/components/avatar" element={<AvatarPage />} />
              <Route path="/components/chip" element={<ChipPage />} />
              <Route path="/components/dropdown-menu" element={<DropdownMenuPage />} />
              <Route path="/composites" element={<Navigate to="/composites/modal" replace />} />
              <Route path="/composites/modal" element={<Modal />} />
              <Route path="/composites/app-header" element={<AppHeader />} />
              <Route path="/composites/product-banner" element={<ProductBanner />} />
              <Route path="/composites/home-page-action-bar" element={<HomePageActionBar />} />
              <Route path="/composites/panel-header" element={<PanelHeaderPage />} />
              <Route path="/composites/left-panel" element={<LeftPanelPage />} />
              <Route path="/composites/study-status-bar" element={<StudyStatusBarPage />} />
              <Route path="/composites/accordion" element={<AccordionPage />} />
              <Route path="/composites/workspace" element={<WorkspacePage />} />
              <Route path="/composites/tool-tile" element={<ToolTilePage />} />
              <Route path="/composites/calendar" element={<CalendarPage />} />
              <Route path="/components/study-status" element={<StudyStatusPage />} />
              <Route path="/components/study-row" element={<StudyRowPage />} />
              <Route path="/components/study-table-header" element={<StudyTableHeaderPage />} />
              <Route path="/templates" element={<Navigate to="/templates/about" replace />} />
              <Route path="/templates/about" element={<AboutTemplates />} />
              <Route path="/templates/home-page" element={<HomePageTemplate />} />
              <Route path="/templates/landing-page" element={<LandingPageTemplate />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

