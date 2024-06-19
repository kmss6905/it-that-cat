'use client';
import { usePathname, useRouter } from 'next/navigation';
import { routes } from './routes';

const Nav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const permissionPath = ['/mypage'];

  if (
    permissionPath.filter((path) => pathname === '/' || pathname === path)
      .length > 0
  )
    return (
      <div className='flex justify-around z-10 bg-white w-full pt-10px pb-22px'>
        {routes.map((menu) => (
          <div
            key={menu.path}
            onClick={() => router.push(menu.path)}
            className='flex flex-col gap-0.5 items-center nav cursor-pointer group w-12 h-10'
          >
            {pathname === menu.path ? (
              <menu.ActiveIcon />
            ) : (
              <div className='relative'>
                <menu.ActiveIcon className='absolute opacity-0 group-hover:opacity-100 transition-opacity' />
                <menu.Icon />
              </div>
            )}
            <span
              className={`${pathname === menu.path ? 'text-primary-500' : 'text-gray-200'} group-hover:text-primary-500`}
            >
              {menu.menu}
            </span>
          </div>
        ))}
      </div>
    );

  return null;
};

export default Nav;
