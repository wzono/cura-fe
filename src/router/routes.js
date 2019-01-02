
import Login from '@/views/login/Index.vue';
import Welcome from '@/views/welcome/Index.vue';
import Register from '@/views/register/Index.vue';
import UserLayout from '@/views/user/Layout.vue';

const PageNotFound = () => import('@/views/404/404.vue');
const RegisterSuccess = () => import('@/views/register/Success.vue');

const UserMessageBox = () => import('@/views/user/components/MessageBox.vue');
const UserContacts = () => import('@/views/user/components/Contacts');
const UserChat = () => import('@/views/user/components/Chat');
const UserSearchContact = () => import('@/views/user/components/SearchContact');
const UserDetail = () => import('@/views/user/components/UserDetail');
const UserAddContact = () => import('@/views/user/components/AddContact');

const UserSettings = () => import('@/views/user/components/Settings');
const UpdateExtraInfo = () => import('@/views/user/components/update/UpdateExtraInfo');
const UpdatePhone = () => import('@/views/user/components/update/UpdatePhone');
const UpdateNickname = () => import('@/views/user/components/update/UpdateNickname');

const UserContactSettings = () => import('@/views/user/components/ContactSettings');

const UserNotice = () => import('@/views/user/components/Notice.vue');

const UserGroupSettings = () => import('@/views/user/components/GroupSettings');


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
      },
      {
        path: 'settings/extra_info',
        name: 'update-extra-info',
        component: UpdateExtraInfo,
      },
      {
        path: 'settings/phone',
        name: 'update-phone',
        component: UpdatePhone,
      },
      {
        path: 'settings/nickname',
        name: 'update-nickname',
        component: UpdateNickname,
      },
      {
        path: 'detial/contact_settings',
        name: 'contact-settings',
        component: UserContactSettings,
      },
      {
        path: 'notice',
        name: 'notice',
        component: UserNotice,
      },
      {
        path: 'group_settings',
        component: UserGroupSettings,
      }
    ]
  },
  { path: '*', component: PageNotFound }
];

export default routes;
