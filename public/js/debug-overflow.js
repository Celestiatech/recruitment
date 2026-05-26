(function () {
  try {
    var params = new URLSearchParams(window.location.search);
    if (!(params.has("debug") || params.get("debug") === "1")) return;

    document.documentElement.setAttribute("data-debug-overflow", "1");

    function findOverflowingElements() {
      var docEl = document.documentElement;
      var viewportWidth = docEl.clientWidth;
      var all = document.body.querySelectorAll("*");
      var offenders = [];

      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        if (!el.getBoundingClientRect) continue;
        var rect = el.getBoundingClientRect();
        if (rect.right > viewportWidth + 1 || rect.left < -1) {
          offenders.push(el);
        }
      }

      return offenders;
    }

    function mark(el) {
      el.style.outline = "2px solid #ff00ff";
      el.style.outlineOffset = "-2px";
    }

    function run() {
      var offenders = findOverflowingElements();
      if (!offenders.length) {
        console.log("[debug-overflow] No overflowing elements found.");
        return;
      }
      console.group("[debug-overflow] Overflowing elements (" + offenders.length + ")");
      offenders.forEach(function (el) {
        mark(el);
        console.log(el, el.getBoundingClientRect());
      });
      console.groupEnd();
    }

    window.addEventListener("load", function () {
      run();
      setTimeout(run, 500);
      setTimeout(run, 1500);
    });
  } catch (e) {
    console.warn("[debug-overflow] Failed:", e);
  }
})();

