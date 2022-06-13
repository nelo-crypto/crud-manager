const crudManagerConfig: Config = require('./../../crudmanager.config.json')
const ROUTE = {
    HOME: '/',
    USERS: {
        LIST: '/admin/users/list/%d',
        CREATE: '/admin/users/create',
        READ: '/admin/users/read/%d',
        UPDATE: '/admin/users/update/%d',
    },
    OPTIONS: {
        LIST: '/admin/options/list/%d',
        CREATE: '/admin/options/create',
        READ: '/admin/options/read/%d',
        UPDATE: '/admin/options/update/%d',
    },
    API: {
        PAGINATION: '/api/' + crudManagerConfig.apiVersion + '/pagination/%s/%d',
        USERS: '/api/' + crudManagerConfig.apiVersion + '/entity/user/%d',
        OPTIONS: '/api/' + crudManagerConfig.apiVersion + '/entity/option/%d',
    }
}

export default ROUTE