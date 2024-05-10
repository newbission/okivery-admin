import Container from '@layouts/Conatiner';
import './App.css';
import LoginPage from '@pages/auth/LoginPage';
import { Outlet } from 'react-router-dom';

export const MAIN_TITLE = import.meta.env.OKV_TITLE;
export const set_title = (subtitle?: string): void => {
  let title: string = MAIN_TITLE;
  if(subtitle) {
    title += ` | ${subtitle}`;
  }
  document.title = title;
};
function App() {
  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
