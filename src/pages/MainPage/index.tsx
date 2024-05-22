import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateButton } from '@components/index';

import { set_title } from 'App';
type Props = {};

const MainPage = (props: Props) => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('access');
  useEffect(() => {
    if (!accessToken) {
      console.log('main but not logined');
      navigate('/login');
    }
    set_title();
  }, []);
  return (
    <>
      <NavigateButton to='order'>주문</NavigateButton>
      {/* <NavigateButton to='restaurant'>가게</NavigateButton> */}
      <NavigateButton to='category'>카테고리</NavigateButton>
      <NavigateButton to='hashtag'>해시테그</NavigateButton>
    </>
  );
};

export default MainPage;
