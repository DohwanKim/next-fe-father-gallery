'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { signOut } from '@/service/auth';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await signOut();
      router.push('/admin');
    })();
  }, [router]);

  return <div />;
}
