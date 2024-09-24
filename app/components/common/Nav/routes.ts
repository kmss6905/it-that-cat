import IconHome from '@/assets/images/nav/icon-home.svg';
import IconAcitveHome from '@/assets/images/nav/icon-activeHome.svg';
import IconAddContent from '@/assets/images/nav/icon-addContent.svg';
import IconAcitveAddContent from '@/assets/images/nav/icon-activeAddContent.svg';
import IconMyPage from '@/assets/images/nav/icon-myPage.svg';
import IconActiveMyPage from '@/assets/images/nav/icon-activeMyPage.svg';

export const routes = [
  { Icon: IconHome, ActiveIcon: IconAcitveHome, path: '/', menu: '홈' },
  {
    Icon: IconAddContent,
    ActiveIcon: IconAcitveAddContent,
    path: '/register',
    menu: '냥이 등록',
  },
  {
    Icon: IconMyPage,
    ActiveIcon: IconActiveMyPage,
    path: '/mypage',
    menu: '마이페이지',
  },
];
