export default [
  {
    path: '/article/:id',
    name: 'article-view',
    component: () => import('../../views/article/ArticleView'),
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    props: (route) => ({
      articleId: route.params.id
    })
  },
  {
    path: '/articles',
    name: 'article-list',
    component: () => import('../../views/article/ArticleList'),
    meta: {
      requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
    }
  }
]
