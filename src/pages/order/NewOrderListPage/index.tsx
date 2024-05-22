import { useEffect, useState } from 'react';
import Loading from '@components/Loading';
import { getResponseData } from '@utils/apiController';
import { APIPurpose, APIStatus } from '@utils/custom_constant';

import styles from './NewOrderListPage.module.css';
import ReplyButtonArea from '@components/order/ReplyButtonArea';
import { useNavigate } from 'react-router-dom';

const NewOrderListPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Array<any>>([]);
  const navigate = useNavigate();
  const removeOrder = (id: number) => {
    // const newOrders = orders.splice(idx, 1)
    setOrders(orders.filter((e) => e.id !== id));
  };
  useEffect(() => {
    // api로 리스트 가져오기
    const getNewOrderList = async () => {
      try {
        const response = await getResponseData(
          APIPurpose.ORDER_LIST_NEW,
          'GET'
        );
        console.log(response?.status);
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
      <h1 style={{ textAlign: 'center', margin: 0 }}>신규 주문 목록</h1>
      <ul className={`${styles.list} ${styles.no_scrollbar}`}>
        {orders.map((e) => (
          <li key={e.id} style={{ marginBottom: 10 }}>
            {e.id}.
            <ReplyButtonArea id={e.id} removeOrder={removeOrder} />
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

export default NewOrderListPage;
