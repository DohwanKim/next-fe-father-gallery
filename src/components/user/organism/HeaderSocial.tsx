'use client';

import { Instagram } from 'lucide-react';
import Link from 'next/link';

const socialItems = [
  { name: 'Instagram', href: '/', render: <Instagram /> },
  { name: 'About', href: '/about', render: <Instagram /> },
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
