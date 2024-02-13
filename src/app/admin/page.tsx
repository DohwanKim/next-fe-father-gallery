'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { css } from '@/../styled-system/css';
import { signIn } from '@/service/auth';
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
  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    signIn(data)
      .then(() => {
        router.push('/admin/dashboard');
      })
      .catch((err) => {
        console.log(err.data.message);
      });
  };

  return (
    <div
      className={css({
        position: 'relative',
        width: '100%',
        height: '100vh',
      })}
    >
      <div
        className={css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          bgImage: 'url(/img/admin-login-bg.jpg)',
          bgPosition: 'center center',
          bgRepeat: 'no-repeat',
          bgSize: 'cover',
          filter: 'blur(3px)',
        })}
      />
      <div
        className={css({
          position: 'absolute',
          width: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
          p: '40px',
          '& input': {
            backgroundColor: 'transparent',
            border: '1px solid black',
          },
        })}
      >
        <div>
          <h1
            className={css({
              fontSize: '24px',
              fontWeight: 'bold',
              mb: '20px',
              textAlign: 'center',
            })}
          >
            Father Gallery Admin
          </h1>
        </div>
        <form
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div>아이디</div>
            <input
              placeholder={'아이디'}
              className={css({ width: '100%', padding: '2px 10px' })}
              type="text"
              {...register('username', { required: true })}
            />
            {errors.username && <span>아아디를 입력해주세요.</span>}
          </div>
          <div>
            <div>비밀번호</div>
            <input
              placeholder={'비밀번호'}
              className={css({ width: '100%', padding: '2px 10px' })}
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
              <span>비밀번호를 입력해주세요.</span>
            )}
          </div>
          <button
            type={'submit'}
            className={css({
              cursor: 'pointer',
              backgroundColor: 'gray.500',
              fontWeight: 'bold',
              color: 'white',
              padding: '5px',
              borderRadius: '5px',
            })}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
