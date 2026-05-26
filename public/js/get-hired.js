(function () {
  function bsAvailable() {
    return !!(window.bootstrap && window.bootstrap.Modal);
  }

  function showFallbackModal(el) {
    if (!el) return;

    // Create backdrop (Bootstrap-like)
    var backdrop = document.querySelector(".modal-backdrop.js-get-hired-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show js-get-hired-backdrop";
      document.body.appendChild(backdrop);
    }

    el.style.display = "block";
    // force reflow
    void el.offsetHeight;
    el.classList.add("show");
    el.setAttribute("aria-modal", "true");
    el.removeAttribute("aria-hidden");

    document.body.classList.add("modal-open");
  }

  function hideFallbackModal(el) {
    if (!el) return;
    el.classList.remove("show");
    el.setAttribute("aria-hidden", "true");
    el.removeAttribute("aria-modal");
    el.style.display = "none";

    var backdrop = document.querySelector(".modal-backdrop.js-get-hired-backdrop");
    if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
    document.body.classList.remove("modal-open");
  }

  function ensureModal() {
    if (document.getElementById("getHiredModal")) return;

    var html =
      '<div class="modal fade" id="getHiredModal" tabindex="-1" aria-hidden="true">' +
      '  <div class="modal-dialog modal-dialog-centered modal-lg get-hired-dialog">' +
      '    <div class="modal-content">' +
      '      <div class="modal-header">' +
      '        <div>' +
      '          <h5 class="modal-title mb-0">Get Hired</h5>' +
      '          <div class="small text-muted">Share your details and we will contact you.</div>' +
      "        </div>" +
      '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
      "      </div>" +
      '      <form id="getHiredForm">' +
      '        <div class="modal-body get-hired-body">' +
      '          <div class="row g-2">' +
      '            <div class="col-12 col-md-6">' +
      '              <label class="form-label small mb-1">Name *</label>' +
      '              <div class="input-group input-group-sm">' +
      '                <span class="input-group-text"><i class="las la-user"></i></span>' +
      '                <input class="form-control" name="name" placeholder="Your full name" required />' +
      "              </div>" +
      "            </div>" +
      '            <div class="col-12 col-md-6">' +
      '              <label class="form-label small mb-1">Email *</label>' +
      '              <div class="input-group input-group-sm">' +
      '                <span class="input-group-text"><i class="las la-envelope"></i></span>' +
      '                <input class="form-control" name="email" type="email" placeholder="name@email.com" required />' +
      "              </div>" +
      "            </div>" +
      '            <div class="col-12 col-md-6">' +
      '              <label class="form-label small mb-1">Phone</label>' +
      '              <div class="input-group input-group-sm">' +
      '                <span class="input-group-text"><i class="las la-phone"></i></span>' +
      '                <input class="form-control" name="phone" inputmode="tel" placeholder="+91 98xxxxxxx" />' +
      "              </div>" +
      "            </div>" +
      '            <div class="col-12 col-md-6">' +
      '              <label class="form-label small mb-1">Place</label>' +
      '              <div class="input-group input-group-sm">' +
      '                <span class="input-group-text"><i class="las la-map-marker"></i></span>' +
      '                <input class="form-control" name="place" placeholder="City, State" />' +
      "              </div>" +
      "            </div>" +
      '            <div class="col-12">' +
      '              <div class="get-hired-divider"></div>' +
      "            </div>" +
      '            <div class="col-12 col-md-6">' +
      '              <label class="form-label small mb-1">Role</label>' +
      '              <div class="input-group input-group-sm">' +
      '                <span class="input-group-text"><i class="las la-briefcase"></i></span>' +
      '                <input class="form-control" name="role" placeholder="e.g. Sales, HR, Developer" />' +
      "              </div>" +
      "            </div>" +
      '            <div class="col-12 col-md-6">' +
      '              <label class="form-label small mb-1">Experience</label>' +
      '              <select class="form-select form-select-sm" name="experience">' +
      '                <option value="">Select</option>' +
      '                <option>Fresher</option>' +
      '                <option>0-1 years</option>' +
      '                <option>1-3 years</option>' +
      '                <option>3-5 years</option>' +
      '                <option>5+ years</option>' +
      "              </select>" +
      "            </div>" +
      '            <div class="col-12">' +
      '              <div class="alert alert-success d-none" id="getHiredOk">Submitted! We will contact you soon.</div>' +
      '              <div class="alert alert-danger d-none" id="getHiredErr"></div>' +
      "            </div>" +
      "          </div>" +
      "        </div>" +
      '        <div class="modal-footer">' +
      '          <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Close</button>' +
      '          <button type="submit" class="btn btn-primary btn-sm" id="getHiredSubmit">Send Request</button>' +
      "        </div>" +
      "      </form>" +
      "    </div>" +
      "  </div>" +
      "</div>";

    var wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstChild);

    // Fallback close handling (if Bootstrap JS is not present)
    var modalEl = document.getElementById("getHiredModal");
    if (modalEl) {
      modalEl.addEventListener("click", function (e) {
        var t = e.target;
        if (!t) return;
        if (t === modalEl) hideFallbackModal(modalEl);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") hideFallbackModal(modalEl);
      });
      var dismissers = modalEl.querySelectorAll("[data-bs-dismiss=\"modal\"], .btn-close");
      for (var i = 0; i < dismissers.length; i++) {
        dismissers[i].addEventListener("click", function () {
          hideFallbackModal(modalEl);
        });
      }
    }
  }

  function showModal() {
    ensureModal();
    var el = document.getElementById("getHiredModal");
    try {
      if (bsAvailable()) {
        var Modal = window.bootstrap.Modal;
        if (typeof Modal.getOrCreateInstance === "function") {
          var modal = Modal.getOrCreateInstance(el);
          if (modal && typeof modal.show === "function") modal.show();
          return;
        }
        if (typeof Modal === "function") {
          var modal2 = new Modal(el);
          if (modal2 && typeof modal2.show === "function") modal2.show();
          return;
        }
      }
    } catch (_) {
      // Fall back below
    }

    // jQuery/Bootstrap 4 fallback (if present)
    try {
      if (window.jQuery && window.jQuery.fn && typeof window.jQuery.fn.modal === "function") {
        window.jQuery(el).modal("show");
        return;
      }
    } catch (_) {
      // Fall back below
    }

    showFallbackModal(el);
  }

  async function submit(form) {
    var btn = document.getElementById("getHiredSubmit");
    var ok = document.getElementById("getHiredOk");
    var err = document.getElementById("getHiredErr");

    ok.classList.add("d-none");
    err.classList.add("d-none");
    err.textContent = "";

    btn.disabled = true;
    btn.textContent = "Submitting...";
    try {
      var data = new FormData(form);
      var payload = {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),
        place: String(data.get("place") || ""),
        role: String(data.get("role") || ""),
        experience: String(data.get("experience") || "")
      };

      var res = await fetch("/api/hire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      var json = await res.json().catch(function () {
        return null;
      });
      if (!res.ok) {
        throw new Error((json && json.error) || "Failed to submit.");
      }
      ok.classList.remove("d-none");
      form.reset();
    } catch (e) {
      err.textContent = e && e.message ? e.message : "Failed to submit.";
      err.classList.remove("d-none");
    } finally {
      btn.disabled = false;
      btn.textContent = "Submit";
    }
  }

  document.addEventListener("click", function (e) {
    var target = e.target;
    if (!target) return;
    var btn = target.closest ? target.closest(".js-get-hired") : null;
    if (!btn) return;
    e.preventDefault();
    showModal();
  });

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.id !== "getHiredForm") return;
    e.preventDefault();
    submit(form);
  });
})();
