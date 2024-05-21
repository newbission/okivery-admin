import { NavigateButton } from '@components/index'
import React from 'react'

type Props = {}

const OrderMainPage = (props: Props) => {
  return (
    <>
      <h1>Order</h1>
      <NavigateButton to='list'>주문 내역</NavigateButton>
      <NavigateButton to='list/new'>신규 주문</NavigateButton>
      <NavigateButton to='category'>카테고리</NavigateButton>
      <NavigateButton to='hashtag'>해시테그</NavigateButton>
    </>
  )
}

export default OrderMainPage