//导入vue-router
import { createRouter, createWebHistory } from 'vue-router'
//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import ProvinceLayout from '@/views/Province_Layout.vue'
import EnterpriseLayout from '@/views/Enterprise_Layout.vue'
import UserLayout from '@/views/User_Layout.vue'


import CheckInfo from '@/views/Enterprise/CheckInfo.vue'
import DataReport from '@/views/Enterprise/DataReport.vue'
import Deadline from '@/views/Enterprise/Deadline.vue'
import EnterpriseInfo from '@/views/Enterprise/EnterpriseInfo.vue'

import DataReview from '@/views/Province/DataReview.vue'
import InfoEditDraft from '@/views/Province/InfoEditDraft.vue'
import Message from '@/views/Province/Message.vue'
import Statistic from '@/views/Enterprise/Statistic.vue'

import UserManage from '@/views/Admin/UserManage.vue'

//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    { 
        path: '/enterprise', 
        component: EnterpriseLayout,children:[
            {path:'/enterprise/checkinfo',component: CheckInfo},
            {path:'/enterprise/report', component: DataReport},
            {path:'/enterprise/deadline', component: Deadline},
            {path:'/enterprise/info',component: EnterpriseInfo},
            { path:'/enterprise/stats', component: Statistic}
        ] 
    },
    {
        path: '/province',
        component: ProvinceLayout, children:[
            { path:'/province/review', component: DataReview},
            { path:'/province/infoedit', component: InfoEditDraft},
            { path:'/province/msg', component: Message},
            
        ]
    },
    { path:'/admin',component: UserLayout, children:[
        {path:'/admin/manage', component: UserManage}
    ]}
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

//导出路由
export default router