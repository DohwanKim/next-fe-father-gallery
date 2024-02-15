'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

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
    <div>
      <div />
      <div>
        <div>
          <div>hello</div>
          <h1>Father Gallery Admin</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>아이디</div>
            <input
              placeholder={'아이디'}
              type="text"
              {...register('username', { required: true })}
            />
            {errors.username && <span>아아디를 입력해주세요.</span>}
          </div>
          <div>
            <div>비밀번호</div>
            <input
              placeholder={'비밀번호'}
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
          <button type={'submit'}>로그인</button>
        </form>
      </div>
    </div>
  );
}
