import { useEffect, useState } from 'react';
import Loading from '@components/Loading';
import { getResponseData } from '@utils/apiController';
import { APIPurpose, APIStatus } from '@utils/custom_constant';

import styles from './NewOrderListPage.module.css';
import ReplyButtonArea from '@components/order/ReplyButtonArea';

const NewOrderListPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Array<any>>([]);
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
      <ul className={`${styles.list} ${styles.no_scrollbar}`}>
        {orders.map((e) => (
          <li key={e.id}>
            {e.id}. 
            <ReplyButtonArea id={e.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewOrderListPage;
