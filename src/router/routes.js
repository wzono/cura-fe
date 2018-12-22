
const Login = () => import('@/views/login/Index.vue');
const Welcome = () => import('@/views/welcome/Index.vue');
const Register = () => import('@/views/register/Index.vue');
const RegisterSuccess = () => import('@/views/register/Success.vue');

const UserLayout = () => import('@/views/user/Layout.vue');
const UserMessageBox = () => import('@/views/user/components/MessageBox.vue');
const UserContacts = () => import('@/views/user/components/Contacts');
const UserChat = () => import('@/views/user/components/Chat');
const UserSearchContact = () => import('@/views/user/components/SearchContact');
const UserDetail = () => import('@/views/user/components/UserDetail');
const UserAddContact = () => import('@/views/user/components/AddContact');

const UserSettings = () => import('@/views/user/components/Settings');


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
      },
      {
        path: 'search_contact',
        name: 'search-contact',
        component: UserSearchContact,
      },
      {
        path: 'detail',
        name: 'user-detial',
        component: UserDetail,
      },
      {
        path: 'add_contact',
        name: 'add-contact',
        component: UserAddContact,
      },
      {
        path: 'settings',
        name: 'settings',
        component: UserSettings,
      }
    ]
  }
];

export default routes;
