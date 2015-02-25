$( document ).ready(function() {
    // Shift nav in mobile when clicking the menu.
    $(document).on('click', "[data-toggle='wy-nav-top']", function() {
      $("[data-toggle='wy-nav-shift']").toggleClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    // Close menu when you click a link.
    $(document).on('click', ".wy-menu-vertical .current ul li a", function() {
      $("[data-toggle='wy-nav-shift']").removeClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    $(document).on('click', "[data-toggle='rst-current-version']", function() {
      $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });
    // close/open first navigation layer links
    $(document).on('click', ".wy-menu-vertical ul.current li a.toctree-l1", function(ev) {
      var currentText = $(".wy-menu-vertical ul.current li.toctree-l1.current a.toctree-l1").text();
      $(".wy-menu-vertical ul.current li.current").removeClass("current");
      if (currentText !== ev.currentTarget.text) {
        $(ev.currentTarget.parentNode).addClass("current");
      }
    });
    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");

    hljs.initHighlightingOnLoad();

    $("table").addClass('docutils');

    // all main images should open in full resolution when clicked
    $("[role='main'] img").magnificPopup({ 
      type: 'image',
      callbacks: {
        elementParse: function(item) {
          item.src = item.el.attr("src");
        }
      }
    });
});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
            win,
            stickyNavCssClass = 'stickynav',
            applyStickNav = function () {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function () {
                applyStickNav();
                win.on('resize', applyStickNav);
            },
            init = function () {
                navBar = jquery('nav.wy-nav-side:first');
                win    = jquery(window);
            };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));
