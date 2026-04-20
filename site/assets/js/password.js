/* UWC Password Gate — client-side session auth
   Password: copper
   Consistent with spec-navigator.html session key (uwc_auth)
*/
(function () {
  const PASS = 'copper';
  const KEY  = 'uwc_auth';

  function showPage() {
    var gate = document.getElementById('uwc-gate');
    if (gate) gate.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function buildGate() {
    document.body.style.overflow = 'hidden';
    var gate = document.getElementById('uwc-gate');
    if (!gate) return; // gate markup must be in HTML
    gate.classList.remove('hidden');

    var form  = document.getElementById('gate-form');
    var input = document.getElementById('gate-input');
    var error = document.getElementById('gate-error');

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var val = (input.value || '').trim().toLowerCase();
        if (val === PASS) {
          sessionStorage.setItem(KEY, PASS);
          showPage();
        } else {
          input.classList.add('error');
          error.classList.add('visible');
          input.value = '';
          input.focus();
          setTimeout(function () { input.classList.remove('error'); }, 400);
        }
      });
    }
  }

  // Check session on load
  if (sessionStorage.getItem(KEY) === PASS) {
    // already authenticated — show page as soon as DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showPage);
    } else {
      showPage();
    }
  } else {
    // not authenticated — build gate on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildGate);
    } else {
      buildGate();
    }
  }
})();
