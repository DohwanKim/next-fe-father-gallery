import { BrowserContext, expect, Page, test } from '@playwright/test';

/**
 * 시나리오
 * - 확인사항
 *  - 레이아웃 정상 노출 확인
 *  - 홈의 타이틀 노출 확인
 *  - 홈의 "/about" 링크 클릭시 이동 후 "/about"의 타이틀 노출 확인
 *
 * - 레이아웃 정상 노출 확인
 *  1. 페이지에 접속한다
 *  2. 헤더의 로고가 정상 출력 되는지 확인한다
 *  3. 푸터 저작권 텍스트가 정상 출력 되는지 확인한다
 * - 페이지 접속 및 홈 확인
 *  1. 페이지에 접속한다
 *  2. 페이지의 타이틀이 "KimDongCheol Art"인지 확인한다
 *  3. 페이지의 "by. KimDongCheol"을 클릭하면 "/about"으로 이동하는지 확인한다
 */

test.describe('Home', () => {
  let browserContext: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser, contextOptions }) => {
    browserContext = await browser.newContext(contextOptions);
  });

  test.beforeEach(async () => {
    page = await browserContext.newPage();
    await page.goto('/');
  });

  test.describe('레이아웃 정상 노출 확인', () => {
    test('헤더의 로고가 출력된다', async () => {
      const logo = page.getByAltText('김동철 그림세상');

      await expect(logo).toBeVisible();
    });

    test('푸터 저작권 텍스트가 정상 출력 된다', async () => {
      const footer = page.getByTestId('footer');
      const footerCopyrightText = footer.getByText('Copyright');

      await expect(footerCopyrightText).toBeVisible();
    });
  });

  test.describe('페이지 접속 및 홈 확인', () => {
    test('페이지의 타이틀이 "KimDongCheol Art"인지 확인한다', async () => {
      const pageTitle = page.getByRole('heading', {
        level: 1,
        name: 'KimDongCheol Art Gallery',
      });

      await expect(pageTitle).toBeVisible();
    });

    test('페이지의 "by. KimDongCheol"을 클릭하면 "/about"으로 이동하는지 확인한다', async () => {
      await page.getByText('by. KimDongCheol').click();
      await page.waitForURL('**/about');
      const aboutPageTitle = page.getByRole('heading', {
        level: 1,
        name: 'Dongcheol Kim | Republic of Korea',
      });

      await expect(aboutPageTitle).toBeVisible();
    });
  });
});
