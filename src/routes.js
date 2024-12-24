import React from 'react'
// 关键代码
import { createHashRouter } from 'react-router-dom'

// 引入组件，没啥好说的


// 写法与 Vue.js 类似
const router = createHashRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: 'manage',
                element: <ManageLayout />,
                children: [
                    {
                        path: 'list',
                        element: <List />,
                    },
                ],
            },
            {
                path: '*', // 404 路由配置都写在最后，起到一个兜底的作用
                element: <NotFond />,
            },
        ],
    },
    {
        path: 'question',
        element: <QuestionLayout />,
        children: [
            {
                path: 'edit/:id',
                element: <Edit />,
            },
        ],
    },
])
export default router
