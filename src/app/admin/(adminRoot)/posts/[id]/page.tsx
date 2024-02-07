'use client';
import { css } from '../../../../../../styled-system/css';
import { flex } from '../../../../../../styled-system/patterns';

interface Props {
  params: { slug: number | 'edit' };
}

export default function PostDetailPage({ params }: Props) {
  console.log(params);

  return (
    <>
      <h1>페이지 이름</h1>
      <form
        className={css({
          '& input': {
            border: '1px solid #ddd',
          },
        })}
      >
        <div>
          <div>image</div>
          <div>
            <input type={'file'} />
          </div>
        </div>
        <div>
          <div>title</div>
          <div>
            <input type={'text'} />
          </div>
        </div>
        <div>
          <div>artType</div>
          <div>
            <input type={'text'} />
          </div>
        </div>
        <div>
          <div>canvasSize</div>
          <div>
            <input type={'text'} />
          </div>
        </div>
        <div>
          <div>price</div>
          <div>
            <input type={'text'} />
          </div>
        </div>
        <div>
          <div>frameType</div>
          <div>
            <input type={'text'} />
          </div>
        </div>
        <div>
          <div>frameType</div>
          <div>
            <input type={'text'} />
          </div>
        </div>
        <div>
          <div>tags</div>
          <div>
            <input type={'text'} />
          </div>
        </div>
      </form>
      <div className={flex()}>
        <button className={css({ mr: 'auto' })}>[삭제]</button>
        <button>[취소]</button>
        <button>[저장]</button>
      </div>
    </>
  );
}
