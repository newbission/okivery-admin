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
