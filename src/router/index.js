import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import DiaryList from '../views/DiaryList.vue'
import Write from '../views/DiaryWrite.vue'
import Diary from '../views/Diary.vue'
import DiaryDetailByNo from '../views/DiaryDetail.vue'
import DiaryUpdateByNo from '../views/DiaryUpdateByNo.vue'
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/diary',
    name: 'diary',
    component: Diary,
    children: [
      { path: 'write', name: 'DiaryWrite', component: Write, meta: { auth: true,}, },
      { path: 'list', name: 'DiaryList', component: DiaryList, meta: { auth: true,},},
      { path: 'detail/:no', name: 'DiaryDetailByNo', component: DiaryDetailByNo, meta: { auth: true,}, },
      { path: 'update/:no', name: 'DiaryUpdateByNo', component: DiaryUpdateByNo, meta: { auth: true,},},
    ]
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// 로그인이 필요한 페이지 요청 시 현재 사용자값을 체크하고, 미인증 상태라면 로그인 페이지로 돌려준다.  
router.beforeEach((to, from, next) => {
    if(to.meta.auth&&!store.state.currentUser){
      console.log('인증이 필요합니다.');
      alert('로그인한 사용자만 이용할 수 있습니다.');
      next('/');
      return;
    }
    next();
});

export default router
