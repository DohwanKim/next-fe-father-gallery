// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: false,
//     },
//   },
// });

const mockUsePathname = jest.fn().mockReturnValue('/gallery');
jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname() {
      return mockUsePathname();
    },
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({ get: () => {} }),
    useServerInsertedHTML: jest.fn(),
  };
});

const mockTypeQuery = jest.fn().mockReturnValue('');
jest.mock('nuqs', () => {
  return {
    useQueryState: jest.fn(() => [mockTypeQuery]),
  };
});

// const Wrapper = ({ children }: { children: ReactNode }) => (
//   <QueryClientProvider client={queryClient}>
//     <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
//   </QueryClientProvider>
// );

window.scrollTo = jest.fn();

jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    usePathname: () => ({ pathname: '' }),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({ get: () => {} }),
    useServerInsertedHTML: jest.fn(),
  };
});

// eslint-disable-next-line no-warning-comments
/**
 * TODO: 짜면서 헤딩하다가 막혀서 일단 작성을 미뤄두었다. 나중에 아래의 테스트 코드를 완성해보자.
 *  - 랜더된다
 *  - isPending이 true일 때 스켈레톤이 랜더된다.
 *  - 스크롤을 내리면 fetchNextPage가 호출된다.
 */
describe('Posts', () => {
  it.todo('랜더된다');
  // it('랜더', async () => {
  //   render(
  //     <Wrapper>
  //       <Posts />
  //     </Wrapper>,
  //   );
  //
  //   expect(await screen.findByText('MOCK 샘플 게시글1')).toBeInTheDocument();
  // });
});
