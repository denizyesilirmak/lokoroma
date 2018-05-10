import { LokoromaPage } from './app.po';

describe('lokoroma App', () => {
  let page: LokoromaPage;

  beforeEach(() => {
    page = new LokoromaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
