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
  {
    name: 'About',
    href: 'https://blog.naver.com/kreator2006',
    render: <NaverBlogIcon />,
  },
];

const HeaderSocial = () => {
  return (
    <div className={'flex items-center gap-x-2'}>
      {socialItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          target={'_blank'}
          scroll={false}
          className={
            'grayscale hover:grayscale-0 transition-grayscale duration-300'
          }
        >
          {item.render ? item.render : item.name}
        </Link>
      ))}
    </div>
  );
};

export default HeaderSocial;
