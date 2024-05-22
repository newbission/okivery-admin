import React, { useEffect, useState } from 'react';
import { getResponseData } from '@utils/apiController';
import { APIPurpose, APIStatus } from '@utils/custom_constant';
type ReplyButtonAreaProps = {
  id: number;
  removeOrder: (id: number) => void;
};

const ReplyButtonArea = ({ id, removeOrder }: ReplyButtonAreaProps) => {
  const [selfDelivery, setSelfDelivery] = useState<boolean>(false);
  const [cookingTime, setCookingTime] = useState<number>(0);
  const [isApprove, setIsApprove] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<number | null>(null);

  useEffect(() => {
    setSelfDelivery(false);
    setIsApprove(null);
  }, []);

  const orderReplyHandler = async () => {
    let reqData = null;
    let url = null;
    if (isApprove === 'approve') {
      if (!cookingTime) {
        console.log('cookingTime is required');
        return;
      }
      reqData = {
        order_id: id,
        is_self_delivery: Number(selfDelivery),
        time: cookingTime,
      };
      url = APIPurpose.ORDER_APPROVE;
    } else {
      url = APIPurpose.ORDER_CANCEL;
      reqData = {
        order_id: id,
        status_code: 300002,
        cancle_reason: cancelReason,
      };
    }
    if (!reqData || !url) return;
    try {
      const response = await getResponseData(url, 'POST', reqData);
      if (response?.status === APIStatus.OK) {
        removeOrder(id);
      }
    } catch {}
  };
  const isApproveHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsApprove(event.currentTarget.value);
  };

  const cookingTimeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCookingTime(Number(event.currentTarget.value));
  };

  const cancelReasonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCancelReason(Number(event.currentTarget.value));
  };

  useEffect(() => {
    if (isApprove !== 'approve') {
      setCookingTime(0);
      setSelfDelivery(false);
    }
    if (isApprove !== 'reject') {
      setCancelReason(null);
    }
  }, [isApprove]);

  return (
    <span>
      <span className='approveArea'>
        {!isApprove || isApprove === 'reject' ? (
          <button onClick={isApproveHandler} value='approve'>
            수락하기
          </button>
        ) : (
          <span>
            <label>
              <input
                type='checkbox'
                name='self_delivery'
                id='self_delivery_cb'
                onClick={(event) => {
                  setSelfDelivery(event.currentTarget.checked);
                }}
              />
              자체배달
            </label>
            <label>
              <input
                type='radio'
                name='approve'
                id='approve10'
                value={10}
                onChange={cookingTimeHandler}
              />
              10분
            </label>
            <label>
              <input
                type='radio'
                name='approve'
                id='approve15'
                value={15}
                onChange={cookingTimeHandler}
              />
              15분
            </label>
            <label>
              <input
                type='radio'
                name='approve'
                id='approve20'
                value={20}
                onChange={cookingTimeHandler}
              />
              20분
            </label>
            <label>
              <input
                type='radio'
                name='approve'
                id='approve30'
                value={30}
                onChange={cookingTimeHandler}
              />
              30분
            </label>
            <label>
              <input
                type='radio'
                name='approve'
                id='approve40'
                value={40}
                onChange={cookingTimeHandler}
              />
              40분
            </label>
            <label>
              <input
                type='radio'
                name='approve'
                id='approve60'
                value={60}
                onChange={cookingTimeHandler}
              />
              60분
            </label>
          </span>
        )}
      </span>
      <span className='rejecetArea'>
        {!isApprove || isApprove === 'approve' ? (
          <button onClick={isApproveHandler} value='reject'>
            거절하기
          </button>
        ) : (
          <span>
            <label>
              <input
                type='radio'
                name='reject'
                id='reject1'
                value={300995}
                onChange={cancelReasonHandler}
              />
              고객 요청
            </label>
            <label>
              <input
                type='radio'
                name='reject'
                id='reject2'
                value={300996}
                onChange={cancelReasonHandler}
              />
              주소 오류
            </label>
            <label>
              <input
                type='radio'
                name='reject'
                id='reject5'
                value={300997}
                onChange={cancelReasonHandler}
              />
              가게 사정
            </label>
            <label>
              <input
                type='radio'
                name='reject'
                id='reject3'
                value={300998}
                onChange={cancelReasonHandler}
              />
              재료 소진
            </label>
            <label>
              <input
                type='radio'
                name='reject'
                id='reject4'
                value={300999}
                onChange={cancelReasonHandler}
              />
              영업 종료
            </label>
          </span>
        )}
      </span>
      {isApprove ? (
        <div>
          <button onClick={orderReplyHandler}>보내기</button>
          <button
            onClick={() =>
              // event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              {
                setIsApprove(null);
              }
            }
          >
            닫기
          </button>
        </div>
      ) : null}
    </span>
  );
};

export default ReplyButtonArea;
