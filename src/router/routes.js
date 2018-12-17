
const Login = () => import('@/views/login/index.vue');
const Welcome = () => import('@/views/welcome/index.vue');
const Register = () => import('@/views/register/index.vue');
const RegisterSuccess = () => import('@/views/register/success.vue');

const UserLayout = () => import('@/views/user/layout.vue');
const UserMessageBox = () => import('@/views/user/children/message_box.vue');


const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/register/success',
    name: 'register-success',
    component: RegisterSuccess,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user',
    component: UserLayout,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '',
        name: 'message-box',
        component: UserMessageBox,
      }
    ]
  }
];

export default routes;
