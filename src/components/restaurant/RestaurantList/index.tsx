import RestaurantListItem from "../RestaurantListItem";

type Props = {
    restaurantList: Array<any>;
}

const RestaurantList = ({restaurantList}: Props) => {
  console.log('restaurantlist')
  return (
    <ul>
        {
            restaurantList.map(e=><RestaurantListItem item={e} key={e?.id}/>)
        }
    </ul>
  )
}

export default RestaurantList