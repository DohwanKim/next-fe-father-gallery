import { BrowserContext, expect, Page, test } from '@playwright/test';

/**
 * 시나리오
 * - 확인사항
 *  - 갤러리 게시판에서 이미지가 나오는지 확인
 *  - 필터를 클릭하여 이미지가 정상적으로 필터되는지 확인
 *  - 이미지를 클릭하여 상세 페이지로 이동하는지 확인
 *  - 상세 페이지에서 상세 정보가 추천 이미지가 뜨는 것을 확인
 *  - 상세 페이지에서 뒤로가기 버튼을 클릭하여 갤러리 페이지로 이동하는지 확인
 *
 * - 갤러리 이용
 *  1. 갤러리 페이지에 접속하여 이미지 아이템과 필터가 나오는지 확인한다
 *  2. 필터를 눌려 이미지가 정상적으로 필터되는지 확인한다
 * - 상세 페이지 이용
 *  1. 상세 페이지로 이동하는지 확인한다
 *  2. 상세 페이지에서 상세 정보가 나오는지 확인한다
 *  3. 상세 페이지에서 추천 이미지가 나오는지 확인한다
 *  4. 뒤로가기 버튼을 클릭하여 갤러리 페이지로 이동하는지 확인한다
 */

// playwright test/e2e/gallery.spec.ts
test.describe('Gallery', () => {
  let browserContext: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser, contextOptions }) => {
    browserContext = await browser.newContext(contextOptions);
  });

  test.beforeEach(async () => {
    page = await browserContext.newPage();
    await page.goto('/gallery');
  });

  test.describe('갤러리 이용', () => {
    test('갤러리 페이지에 접속하여 이미지 아이템과 필터가 나오는지 확인한다', async () => {
      const galleryGrid = page.getByTestId('post-grid');
      const galleryFilter = page.getByTestId('post-filter');

      await expect(galleryGrid).toBeVisible();
      await expect(galleryFilter).toBeVisible();
    });

    // test('필터를 눌려 이미지가 정상적으로 필터되는지 확인한다', async () => {
    //   const galleryGrid = page.getByTestId('post-grid');
    //   const galleryFilter = page.getByTestId('post-filter');
    //
    //   await expect(galleryGrid).toBeVisible();
    //   await expect(galleryFilter).toBeVisible();
    //   await page.waitForSelector(
    //     'html > body > main > div > div:nth-of-type(2) > a:nth-of-type(1)',
    //   );
    //
    //   const beforeItems = await page.$$(
    //     'html > body > main > div > div:nth-of-type(2) a',
    //   );
    //
    //   await galleryFilter.getByText('Watercolor').click();
    //   await page.waitForTimeout(500);
    //
    //   const afterItems = await page.$$(
    //     'html > body > main > div > div:nth-of-type(2) a',
    //   );
    //   expect(beforeItems.length).toBeGreaterThan(afterItems.length);
    // });
  });

  // test.describe('포스트를 클릭하여 상세 페이지로 이동', () => {
  //   test('상세 페이지로 이동하는지 확인한다', async () => {
  //     await page.waitForSelector(
  //       'html > body > main > div > div:nth-of-type(2) > a:nth-of-type(1)',
  //     );
  //     const postItem = await page.$(
  //       'html > body > main > div > div:nth-of-type(2) > a:nth-of-type(1)',
  //     );
  //     await postItem!.click();
  //     await page.waitForURL('**/gallery/**');
  //
  //     expect(page.url()).toContain('/gallery/');
  //   });
  //
  //   test('상세 페이지에서 뒤로가기로 다시 갤러리로 이동하는지 확인한다', async () => {
  //     await page.waitForSelector(
  //       'html > body > main > div > div:nth-of-type(2) > a:nth-of-type(1)',
  //     );
  //     const postItem = await page.$(
  //       'html > body > main > div > div:nth-of-type(2) > a:nth-of-type(1)',
  //     );
  //     await postItem!.click();
  //     await page.waitForURL('**/gallery/**');
  //
  //     const backButton = await page.$("button[class$='mb-5']");
  //
  //     await backButton!.click();
  //     await page.waitForURL('**/gallery');
  //
  //     expect(page.url()).toMatch('/gallery');
  //   });
  //
  //   test('상세 페이지에서 추천 이미지가 나오는지 확인한다', async () => {
  //     await page.waitForSelector(
  //       'html > body > main > div > div:nth-of-type(2) > a:nth-of-type(1)',
  //     );
  //     const postItem = await page.$(
  //       'html > body > main > div > div:nth-of-type(2) > a:nth-of-type(1)',
  //     );
  //
  //     await postItem!.click();
  //     await page.waitForURL('**/gallery/**');
  //
  //     const recommendItems = await page.$$("div[class$='gap-4']");
  //
  //     expect(recommendItems.length).toBeGreaterThan(0);
  //   });
  // });
});
