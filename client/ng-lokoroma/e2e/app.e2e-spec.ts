import { NgLokoromaPage } from './app.po';

describe('ng-lokoroma App', () => {
  let page: NgLokoromaPage;

  beforeEach(() => {
    page = new NgLokoromaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
