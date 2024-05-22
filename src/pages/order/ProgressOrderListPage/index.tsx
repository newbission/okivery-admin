import Loading from '@components/Loading';
import { getResponseData } from '@utils/apiController';
import { APIPurpose, APIStatus } from '@utils/custom_constant';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProgressOrderListPage.module.css';

const ProgressOrderListPage = () => {
  const [orders, setOrders] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      const response = await getResponseData(
        APIPurpose.ORDER_LIST_PROGRESS,
        'GET'
      );
      if (response?.status === APIStatus.OK) {
        setOrders(response.data);
        setIsLoading(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    // api로 리스트 가져오기
    getOrders();
  }, []);

  const requestCooked = async (id:number) => {
    try {
      const response = await getResponseData(
        APIPurpose.ORDER_COOKED,
        'POST',
        {order_id: id}
      );
      if (response?.status === APIStatus.OK) {
        getOrders();
      }
    } catch (error) {}
  }
  const requestDispatch = async (id:number) => {
    const delivery_man = Math.floor(Math.random() * 10) + 1
    try {
      const response = await getResponseData(
        APIPurpose.DELIVERY_DISPATCH,
        'POST',
        {order_id: id, delivery_man_id: delivery_man}
      );
      if (response?.status === APIStatus.OK) {
        getOrders();
      }
    } catch (error) {}
  }
  const requestPickup = async (id:number) => {
    try {
      const response = await getResponseData(
        APIPurpose.DELIVERY_PICKUP,
        'POST',
        {order_id: id}
      );
      if (response?.status === APIStatus.OK) {
        getOrders();
      }
    } catch (error) {}
  }
  const requestDeliveryComplete = async (id:number) => {
    try {
      const response = await getResponseData(
        APIPurpose.DELIVERY_COMPLETE,
        'POST',
        {order_id: id}
      );
      if (response?.status === APIStatus.OK) {
        getOrders();
      }
    } catch (error) {}
  }
  return isLoading ? (
    <Loading />
  ) : (
    <div
      style={{
        height: '100%',
      }}
    >
      <h1 style={{ textAlign: 'center', margin: 0 }}>주문 내역</h1>
      <ul className={`${styles.list} ${styles.no_scrollbar}`}>
        {orders.map((e) => (
          <li key={e.id} style={{ marginBottom: 10 }}>
            {e.id}. {e.status}{' '}
            {e.status === 'Cooking' ? <button onClick={() => requestCooked(e.id)}>조리완료</button> : null}
            <button onClick={() => requestDispatch(e.id)}>배차하기</button>
            <button onClick={() => requestPickup(e.id)}>픽업하기</button>
            <button onClick={() => requestDeliveryComplete(e.id)}>배달완료</button>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default ProgressOrderListPage;
