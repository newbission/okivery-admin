import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

const RestaurantDetailPage = (props: Props) => {
  const {id} = useParams();
  return <div>RestaurantDetailPage{id}</div>;
};

export default RestaurantDetailPage;
