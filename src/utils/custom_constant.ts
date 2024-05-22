export enum APIStatus {
    OK=200,
    CREATE=201,
    BAD_REQUEST=400,
    UNATHORIZED=401,
    SERVER_ERROR=500.
}

export enum APIPurpose {
    ADMIN_LOGIN='/auth/',
    ORDER_LIST='order/list/',
    ORDER_LIST_NEW='order/list/?new=1',
    ORDER_APPROVE='/order/approve/',
    ORDER_CANCEL='/order/cancle/',
}

export enum SessionData {
    ACCESS='access',
    REFRESH='refresh'
}