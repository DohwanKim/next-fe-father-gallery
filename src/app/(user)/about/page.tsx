import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
};

export default function Intro() {
  return (
    <div className={'container'}>
      [Static] 소개 페이지 - 나의 인생과 그림 (추후정리)
    </div>
  );
}
