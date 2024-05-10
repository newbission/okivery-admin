import { NavigateButton } from '@components/index';
import React from 'react';

type Props = {};

const RestaurantPage = (props: Props) => {
  return (
    <>
      <h1>레스토랑입니다~</h1>
      <NavigateButton goBack={true}>돌아가기</NavigateButton>
    </>
  );
};

export default RestaurantPage;
