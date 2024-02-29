'use client';

import Image from 'next/image';
import Link from 'next/link';

const NaverBlogIcon = () => {
  return (
    <Image src={'/img/naver_blog_icon.svg'} alt={''} width={24} height={24} />
  );
};

const InstagramIcon = () => {
  return (
    <Image
      src={'/img/instagram_logo_icon.svg'}
      alt={''}
      width={24}
      height={24}
    />
  );
};

const socialItems = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/dongcheolkim_watercolor/',
    render: <InstagramIcon />,
  },
  { name: 'About', href: '/about', render: <NaverBlogIcon /> },
];

const HeaderSocial = () => {
  return (
    <div className={'flex items-center gap-x-2'}>
      {socialItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          scroll={false}
          className={'transition-colors hover:text-foreground/80'}
        >
          {item.render ? item.render : item.name}
        </Link>
      ))}
    </div>
  );
};

export default HeaderSocial;
