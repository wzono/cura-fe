
const Login = () => import('@/views/login/index.vue');
const Welcome = () => import('@/views/welcome/index.vue');
const Register = () => import('@/views/register/index.vue');
const RegisterSuccess = () => import('@/views/register/success.vue');

const UserLayout = () => import('@/views/user/layout.vue');
const UserMessageBox = () => import('@/views/user/components/msg_box.vue');
const UserContacts = () => import('@/views/user/components/contacts');
const UserChat = () => import('@/views/user/components/chat');


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
    redirect: '/user/msg_box',
    children: [
      {
        path: 'msg_box',
        name: 'msg-box',
        component: UserMessageBox,
      },
      {
        path: 'contacts',
        name: 'contacts',
        component: UserContacts,
      },
      {
        path: 'chat',
        name: 'chat',
        component: UserChat,
      }
    ]
  }
];

export default routes;
