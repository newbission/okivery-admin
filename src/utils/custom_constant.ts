export enum APIStatus {
    OK=200,
    CREATE=201,
    BAD_REQUEST=400,
    UNATHORIZED=401,
    SERVER_ERROR=500.
}

export enum APIPurpose {
    ADMIN_LOGIN='admin/auth/',
    RESTAURANT_LIST='restaurant/list/'
}

export enum SessionData {
    ACCESS='access',
    REFRESH='refresh'
}