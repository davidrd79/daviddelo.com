import AboutPage from '../../components/AboutPage';
import HomePage from '../../components/HomePage';
import ResumePage from '../../components/ResumePage';

const ROUTES = {
  about: {
    component: AboutPage,
    path: '/about',
    title: 'About'
  },
  home: {
    component: HomePage,
    path: '/',
    title: 'Home'
  },
  resume: {
    component: ResumePage,
    path: '/resume',
    title: 'Resume'
  }
};

export default ROUTES;
