# Form-attribute with Internet Explorer 11

This is a small (~700B) polyfill for submit-buttons with form-attributes.

IE does not support using `button[type="submit"]` outside of forms,
so I made a javascript file, that triggers the form as you click on the external button.

The script automatically fixes dynamically added nodes using the `MutationObserver` which is why it does not work with older versions of IE.

## Using with IE-11

Just include the script in your webpage and it'll do the rest.

## Using with IE-9 and IE-10

You need a `MutationObserver`-polyfill to use it with IE-9 and IE-10.

You can find it yourself, or use one made by [megawac](https://github.com/megawac/MutationObserver.js/blob/master/MutationObserver.js).

## Using with IE-8 and below

Just don't.. why do you even support IE-8?

I have no idea how to get it working.

## Using with old browsers other than IE

I think every other browser except Edge (before version 16) does not need a polyfill. ([source](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#Browser_compatibility))

I did not test it with the legacy Edge releases, so you will need to test it for yourself.
