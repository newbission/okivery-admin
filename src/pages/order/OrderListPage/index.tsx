import Loading from '@components/Loading';
import { getResponseData } from '@utils/apiController';
import { APIPurpose, APIStatus } from '@utils/custom_constant';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './OrderListPage.module.css';

const OrderListPage = () => {
  const [orders, setOrders] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    // api로 리스트 가져오기
    const getNewOrderList = async () => {
      try {
        const response = await getResponseData(APIPurpose.ORDER_LIST, 'GET');
        if (response?.status === APIStatus.OK) {
          setOrders(response.data);
          setIsLoading(false);
        }
      } catch (error) {}
    };
    getNewOrderList();
  }, []);
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
            {e.id}. {e.status}
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

export default OrderListPage;
