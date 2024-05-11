import { Link } from 'react-router-dom';

type Props = {
  item: any;
};

const RestaurantListItem = ({ item }: Props) => {
  return (
    <li>
      <Link to={`./${item?.id}`}>{item?.name}</Link>
    </li>
  );
};

export default RestaurantListItem;
