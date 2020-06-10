export default {
    //role name as a key.
    new: {
      routes: [
        {
          component: 'Welcome',
          url: '/welcome'
        }
      ],
    },
     headOfOperation: {
        routes: [
          {
            component: 'OnlyForHeadOfOperation', 
            url: '/only-for-head-of-operation'
          },
          {
            component: 'HeadOfOperationAndManager', 
            url: '/hoo-manager'
          },
          {
            component: 'HeadOfOperationManagerAndHeadCashier', 
            url: '/hoo-manager-head-cashier'
          }
        ],
      },
      manager: {
        routes: [
          {
            component: 'HeadOfOperationAndManager',
            url: '/hoo-manager'
          },
          {
            component: 'OnlyForManager',
            url: '/manager-only'
          }, 
          {
            component: 'HeadOfOperationManagerAndHeadCashier',
            url: '/hoo-manager-head-cashier'
          }
        ],
      },
      common: {
        routes: [
          {
            component: 'CommonRoute',
            url: '/common-component'
          }
        ]
      }
    }