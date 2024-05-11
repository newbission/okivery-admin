import { Loding, NavigateButton, RestaurantList } from '@components/index';
import { getResponseData } from '@utils/apiController';
import { APIPurpose, APIStatus } from '@utils/custom_constant';
import { set_title } from 'App';
import { useEffect, useState } from 'react';

type Props = {};

const RestaurantMainPage = (props: Props) => {
  const F = true;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [restaurants, setRestaurants] = useState<Array<any>>([]);
  useEffect(() => {
    set_title('Restaurant');
    if (F) {
      const getRestaurantList = async () => {
        const response = await getResponseData(APIPurpose.RESTAURANT_LIST, 'GET')
        if(response?.status === APIStatus.OK){
          console.log(response)
          console.log(response?.status, response?.data)
          setRestaurants([...response.data.restaurants])
        }
        setIsLoading(false);
      }
      getRestaurantList()
    }
  }, []);
  return isLoading ? (
    <Loding />
  ) : (
    <>
      <h1>레스토랑입니다~</h1>
      <RestaurantList restaurantList={restaurants}/>
      <NavigateButton to={'./new'}>등록</NavigateButton>
      <NavigateButton to={`./update/${1}`}>수정</NavigateButton>
      <NavigateButton to={''}>삭제</NavigateButton>
      <NavigateButton goBack={true}>돌아가기</NavigateButton>
    </>
  );
};

export default RestaurantMainPage;
