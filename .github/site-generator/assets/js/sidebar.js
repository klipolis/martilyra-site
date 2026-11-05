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
    var path = window.location.pathname;
    var links = document.querySelectorAll('.sidebar-nav a');
    links.forEach(function(link) {
      if (link.getAttribute('href') === path || (path === '/' && link.getAttribute('href') === '/')) {
        link.classList.add('nav-current');
      } else {
        link.classList.remove('nav-current');
      }
    });
  }

  init();
})();