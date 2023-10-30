export const routes = [
    {
        name: 'configList',
        path:'/configList',
        component: () => import('@/pages/ConfigList/index.vue'),
        meta:{
            access: 'User',
            layout: 'BasicLayout'
        }
    },
    {
        name: "User",
        children: [
            {
                path:'/user/login',
                name: 'login',
                component: () => import('@/pages/Auth/Login.vue'),
            },
            {
                path:'/user/register',
                name: 'register',
                component: () => import('@/pages/Auth/Register.vue'),
            },
        ],
        meta: {
            hideInMenu: true,
            layout: 'UserLayout'
        },
    },
    {
        name: "configDetail",
        path: "/configDetail/:id",
        component: () => import('@/pages/ConfigDetail/index.vue'),
        meta:{
            access: 'User',
            hideInMenu: true,
            layout: 'BasicLayout'
        }
    },
    {
        path:'/:pathMatch(.*)*',
        redirect:'/configList',
        meta: {
            hideInMenu: true,
        },
    }
]