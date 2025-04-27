import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const sharedRoutes: Routes = [
    {
        key: 'about', // Temporarily move here
        path: `/about`,
        component: lazy(() => import('@/views/About')),
        authority: [],
    },
    
]

export default sharedRoutes