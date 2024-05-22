import Container from '@layouts/Conatiner';
import './App.css';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const MAIN_TITLE = import.meta.env.OKV_TITLE;
export const set_title = (subtitle?: string): void => {
  let title: string = MAIN_TITLE;
  if (subtitle) {
    title += ` | ${subtitle}`;
  }
  document.title = title;
};
function App() {
  // let location: Array<string> | string = useLocation().pathname.split('/');
  useEffect(() => {
    let subtitle: string = '';
    // if (location.length > 1) {
    //   location = location[1];
    //   subtitle = location[0].toUpperCase() + location.slice(1);
    // }
    set_title(subtitle);
  }, []);

  return (
    <>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
