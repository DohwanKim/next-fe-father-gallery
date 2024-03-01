'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorMessages } from '@/constants/error-messages.enum';
import { signIn } from '@/service/auth';
import regExpPatterns from '@/utils/regExpPatterns';
import { z } from '@/utils/zod-i18n';

const formSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(8).max(20).regex(regExpPatterns.password, {
    message:
      '비밀번호는 영문 대소문자, 숫자, 특수문자를 포함하여 8자 이상 20자 이하 입니다.',
  }),
});

export default function AdminLogin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    await signIn(data)
      .then(() => {
        router.push('/admin/posts');
      })
      .catch((err) => {
        if (err.message === ErrorMessages.INVALID_ID) {
          form.setError('username', {
            message: '아이디가 존재하지 않습니다.',
          });
        } else if (err.message === ErrorMessages.INVALID_PASSWORD) {
          form.setError('password', {
            message: '비밀번호가 일치하지 않습니다.',
          });
        } else {
          console.log(err);
        }
      });
  };

  return (
    <main className={'h-dvh w-dvw relative flex justify-center items-center'}>
      <div
        className={
          'absolute top-0 left-0 w-full h-full blur-sm bg-no-repeat bg-cover'
        }
        style={{ backgroundImage: 'url(/img/admin_login_bg.jpg)' }}
      />
      <div className={'relative w-96 bg-accent rounded-md backdrop-blur p-5'}>
        <h1 className={'text-3xl font-bold text-center pb-5'}>
          KimDongCheol Art Admin
        </h1>
        <Form {...form}>
          <form
            className={'flex flex-col gap-3'}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>
                  <FormControl>
                    <Input placeholder="아이디" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="비밀번호"
                      type={'password'}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className={'mt-3.5'} type="submit">
              로그인
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
