type HTMLSubmitElement = HTMLButtonElement | HTMLInputElement | HTMLElement | Element;

// Only execute on Internet Explorer
if (window.navigator.userAgent.indexOf('Trident') !== -1) {
    function applyPolyfill(): void {
        const nodes: NodeListOf<HTMLSubmitElement> = document.querySelectorAll('[type=submit][form]:not([ie-form])');

        Array.prototype.forEach.call(nodes, function (node: HTMLSubmitElement): void {
            node.addEventListener('click', function (): void {
                const formId: string = this.getAttribute('form');
                const form: HTMLFormElement = document.getElementById(formId) as HTMLFormElement;

                const event = document.createEvent('Event');
                event.initEvent('submit', true, true);
                
                // Appending a submit-button, because dispatchEvent does not trigger the form-action
                // and only gets caught by EventListeners on IE.
                const submit: HTMLButtonElement = document.createElement('button');
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

    window.addEventListener('load', function (): void {
        const config: MutationObserverInit = { attributes: true, childList: true, subtree: true };

        // Apply polyfill for dynamically added nodes
        const observer = new MutationObserver(applyPolyfill);
        observer.observe(document.body, config);

        // Apply polyfill to the existing nodes on load
        applyPolyfill();
    });
}
