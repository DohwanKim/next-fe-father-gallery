import Image from 'next/image';
import Link from 'next/link';

const NaverBlogIcon = () => {
  return (
    <Image
      src={'/img/naver_blog_icon.svg'}
      alt={''}
      width={0}
      height={0}
      sizes={'100vw'}
      className={'aspect-square h-full w-full'}
    />
  );
};

const InstagramIcon = () => {
  return (
    <Image
      src={'/img/instagram_logo_icon.svg'}
      alt={''}
      width={0}
      height={0}
      sizes={'100vw'}
      className={'aspect-square h-full w-full'}
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
    name: 'Naver Blog',
    href: 'https://blog.naver.com/kreator2006',
    render: <NaverBlogIcon />,
  },
];

interface Props {
  isGray?: boolean;
  isShowName?: boolean;
  iconSize?: number;
}

const SocialLinks = ({
  isGray = false,
  isShowName = false,
  iconSize = 24,
}: Props) => {
  const interactionClassNames = isGray
    ? 'grayscale hover:grayscale-0 transition-grayscale'
    : 'hover:text-foreground/60 transition-colors';

  return (
    <div className={'flex items-center gap-x-2'}>
      {socialItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          target={'_blank'}
          scroll={false}
          className={`flex items-center relative duration-300 ${interactionClassNames}`}
        >
          <span
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
            }}
          >
            {item.render}
          </span>
          {isShowName && (
            <span className={`ml-1 text-sm w-auto font-extralight`}>
              {item.name}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
