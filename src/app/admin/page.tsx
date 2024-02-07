'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { css } from '@/../styled-system/css';
import { signIn } from '@/service/login';
import regExpPatterns from '@/utils/regExpPatterns';

type FormLogin = {
  username: string;
  password: string;
};

export default function AdminLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>();
  const onSubmit: SubmitHandler<FormLogin> = (data) => {
    signIn(data)
      .then(() => {
        router.push('/admin/posts');
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  };

  return (
    <div
      className={css({
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <div
        className={css({
          backgroundColor: 'whitesmoke',
          p: '40px',
          '& input': {
            backgroundColor: 'transparent',
            border: '1px solid black',
          },
        })}
      >
        <div>
          <h1>Father Gallery admin</h1>
        </div>
        <form
          className={css({
            display: 'flex',
            flexDirection: 'column',
          })}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="text" {...register('username', { required: true })} />
          {errors.password && <span>This field is required</span>}
          <input
            type="password"
            {...register('password', {
              required: true,
              pattern: {
                value: regExpPatterns.password,
                message:
                  '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.',
              },
            })}
          />
          {errors.password?.type === 'pattern' && (
            <span>{errors.password.message}</span>
          )}
          {errors.password?.type === 'required' && (
            <span>This field is required</span>
          )}
          <button type={'submit'} className={css({ cursor: 'pointer' })}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
