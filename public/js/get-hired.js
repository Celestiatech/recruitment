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
      '  <div class="modal-dialog modal-dialog-centered">' +
      '    <div class="modal-content">' +
      '      <div class="modal-header">' +
      '        <h5 class="modal-title">Get Hired</h5>' +
      '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
      "      </div>" +
      '      <form id="getHiredForm">' +
      '        <div class="modal-body">' +
      '          <div class="row g-3">' +
      '            <div class="col-12">' +
      '              <label class="form-label">Name *</label>' +
      '              <input class="form-control" name="name" required />' +
      "            </div>" +
      '            <div class="col-12">' +
      '              <label class="form-label">Email *</label>' +
      '              <input class="form-control" name="email" type="email" required />' +
      "            </div>" +
      '            <div class="col-12">' +
      '              <label class="form-label">Place</label>' +
      '              <input class="form-control" name="place" />' +
      "            </div>" +
      '            <div class="col-12">' +
      '              <label class="form-label">Role</label>' +
      '              <input class="form-control" name="role" placeholder="e.g. Sales, HR, Developer" />' +
      "            </div>" +
      '            <div class="col-12">' +
      '              <label class="form-label">Experience</label>' +
      '              <input class="form-control" name="experience" placeholder="e.g. Fresher / 2 years" />' +
      "            </div>" +
      '            <div class="col-12">' +
      '              <div class="alert alert-success d-none" id="getHiredOk">Submitted! We will contact you soon.</div>' +
      '              <div class="alert alert-danger d-none" id="getHiredErr"></div>' +
      "            </div>" +
      "          </div>" +
      "        </div>" +
      '        <div class="modal-footer">' +
      '          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>' +
      '          <button type="submit" class="btn btn-primary" id="getHiredSubmit">Submit</button>' +
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
    if (bsAvailable()) {
      var modal = window.bootstrap.Modal.getOrCreateInstance(el);
      modal.show();
      return;
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
