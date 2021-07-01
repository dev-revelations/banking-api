export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_TEST = 'test';

export const PORT_ALTERNATIVE = 8800;

export const CONFIG_KEY_SESSION_SECRET = 'sessionSecret';
export const CONFIG_KEY_ENVIRONMENT = 'environment';

export const GLOBAL_PREFIX = 'api/v1';

export class STRINGS {

    static readonly ERR_CUSTOMER_SERVICE_NO_CONTENT = 'No Content';
    static readonly ERR_CUSTOMER_SERVICE_NOT_FOUND = (id: string) => `Customer #${id} not found`;

    static readonly ERR_ACCOUNT_SERVICE_NO_ACCOUNTS = 'There are no accounts';
    static readonly ERR_ACCOUNT_SERVICE_NOT_FOUND = 'Account not found';
    static readonly ERR_ACCOUNT_SERVICE_GET_BALANCE_FAILED = 'Processing the account balance has failed';
    static readonly ERR_ACCOUNT_SERVICE_ZERO_AMOUNT = 'Transactions with zero amount is not allowed';
    static readonly ERR_ACCOUNT_SERVICE_INSUFFICIENT_BALANCE = 'Insufficient account balance';
    static readonly ERR_ACCOUNT_SERVICE_AMOUNT_NOT_VALID = 'Transfer amount value is not valid';

}

export class ROUTES {
    static readonly PARAM_ID = 'id';
    static readonly PARAM_CUSTOMER_ID = 'customerId';

    static readonly CUSTOMER_ROOT = 'customer';
    static readonly CUSTOMER_GET_ONE = ':id';

    static readonly ACCOUNT_ROOT = 'account';
    static readonly ACCOUNT_GET_ALL = 'all/:customerId';
    static readonly ACCOUNT_GET_DETAIL = 'detail/:id';
    static readonly ACCOUNT_PATCH = ':id';
    static readonly ACCOUNT_DELETE = ':id';
    static readonly ACCOUNT_GET_TRANSACTIONS = '/transactions/:id';
    static readonly ACCOUNT_GET_BALANCE = '/balance/:id';
    static readonly ACCOUNT_POST_TOP_UP = '/topup';
    static readonly ACCOUNT_POST_TRANSFER = '/transfer';
}