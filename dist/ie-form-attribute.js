// Only execute on Internet Explorer
if (window.navigator.userAgent.indexOf('Trident') !== -1) {
    function applyPolyfill() {
        var nodes = document.querySelectorAll('[type=submit][form]:not([ie-form])');
        Array.prototype.forEach.call(nodes, function (node) {
            node.addEventListener('click', function () {
                var formId = this.getAttribute('form');
                var form = document.getElementById(formId);
                var event = document.createEvent('Event');
                event.initEvent('submit', true, true);
                // Appending a submit-button, because dispatchEvent does not trigger the form-action
                // and only gets caught by EventListeners on IE.
                var submit = document.createElement('button');
                submit.type = 'submit';
                // HTMLElement.hidden is not supported until IE-11
                submit.setAttribute('hidden', 'hidden');
                form.appendChild(submit);
                submit.click();
                form.removeChild(submit);
            });
            // Set attribute to exclude from next call of applyPolyfill()
            node.setAttribute('ie-form', 'ie-form');
        });
    }
    window.addEventListener('load', function () {
        var config = { attributes: true, childList: true, subtree: true };
        // Apply polyfill for dynamically added nodes
        var observer = new MutationObserver(applyPolyfill);
        observer.observe(document.body, config);
        // Apply polyfill to the existing nodes on load
        applyPolyfill();
    });
}
