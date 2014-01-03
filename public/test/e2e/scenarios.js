'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });


  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser().window().path()).toBe("/");
  });


  describe('Home page', function() {

    beforeEach(function() {
      browser().navigateTo('/');
    });
    it('should display breadcrumbs', function() {
      expect(element('ol.breadcrumb').count()).toBe(1);
    });
    it('should display about breadcrumb', function() {
      expect(element('ol.breadcrumb li span').text()).toBe("Home");
    });
    it('should display a welcome message', function() {
      expect(element('h1').text()).
      toMatch(/Welcome to/);
    });

  });

  describe('About Page', function() {

    beforeEach(function() {
      browser().navigateTo('#/page/about');
    });


    it('should display breadcrumbs', function() {
      expect(element('ol.breadcrumb').count()).toBe(1);
    });

    it('should display about breadcrumb', function() {
      expect(element('ol.breadcrumb li span').text()).toBe("About");
    });

  });


});