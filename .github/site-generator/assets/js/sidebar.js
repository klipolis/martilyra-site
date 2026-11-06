(function () {
  'use strict';

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  function setCookie(name, value) {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + ';path=/;SameSite=Lax';
  }

  window.toggleSidebar = function () {
    var wrapper = document.querySelector('.layout-wrapper');
    var isExpanded = wrapper.classList.toggle('sidebar-expanded');
    setCookie('sidebarView', isExpanded ? 'expanded' : 'collapsed');
    updateToggleButton(isExpanded);
  };

  function init() {
    var wrapper = document.querySelector('.layout-wrapper');
    var isExpanded = getCookie('sidebarView') === 'expanded';
    wrapper.classList.toggle('sidebar-expanded', isExpanded);
    updateToggleButton(isExpanded);

    var navLinks = wrapper.querySelectorAll('.sidebar-nav a[href]');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        if (window.matchMedia('(hover: none)').matches) {
          wrapper.classList.remove('sidebar-expanded');
          setCookie('sidebarView', 'collapsed');
          updateToggleButton(false);
        }
      });
    }

    markCurrentPage();
  }

  function updateToggleButton(isExpanded) {
    var button = document.querySelector('.sidebar-toggle');
    if (button) {
      button.setAttribute('aria-expanded', String(isExpanded));
      button.setAttribute('aria-label', isExpanded ? 'Menü bezárása' : 'Menü megnyitása');
    }
  }

  function markCurrentPage() {
    var currentPath = normalizePath(window.location.pathname);
    var homeLink = document.querySelector('.site-title');
    var siteRoot = homeLink ? normalizePath(new URL(homeLink.href, window.location.href).pathname) : '/';
    var links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(function(link) {
      var linkPath = normalizePath(new URL(link.href, window.location.href).pathname);
      var isHome = linkPath === siteRoot;
      var isCurrentPage = linkPath === currentPath;
      var isCurrentSection = !isHome && currentPath.indexOf(linkPath + '/') === 0;
      var isActive = isCurrentPage || isCurrentSection;

      link.classList.toggle('nav-current', isActive);
      if (isActive) {
        link.setAttribute('aria-current', isCurrentPage ? 'page' : 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  function normalizePath(path) {
    return path.length > 1 ? path.replace(/\/+$/, '') : path;
  }

  init();
})();