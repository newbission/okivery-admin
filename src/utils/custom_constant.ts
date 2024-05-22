export enum APIStatus {
  OK = 200,
  CREATE = 201,
  BAD_REQUEST = 400,
  UNATHORIZED = 401,
  SERVER_ERROR = 500,
}

export enum APIPurpose {
  ADMIN_LOGIN = '/auth/',
  ORDER_LIST = 'order/list/',
  ORDER_LIST_NEW = 'order/list/?state=new',
  ORDER_LIST_PROGRESS = 'order/list/?state=progress',
  ORDER_APPROVE = '/order/approve/',
  ORDER_CANCEL = '/order/cancle/',
  ORDER_COOKED = '/order/cooked/',
}

export enum SessionData {
  ACCESS = 'access',
  REFRESH = 'refresh',
}
