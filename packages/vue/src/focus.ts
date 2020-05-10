import { DirectiveOptions } from "vue";

export interface FocusDirectiveProperties {
  key: any;
  preventScroll?: boolean;
  preserve?: boolean;
}

function focus(el: HTMLElement, options: FocusDirectiveProperties) {
  let { preserve = false, preventScroll = false } = options;
  if (preserve && el.contains(document.activeElement)) {
    return;
  }
  setTimeout(() => {
    // @ts-ignore
    el.focus({ preventScroll });
  });
}

let focusDirective: DirectiveOptions = {
  inserted(el, binding) {
    if (process.env.NODE_ENV !== "production") {
      if (!el.hasAttribute("tabIndex") && el.tabIndex === -1) {
        console.warn(
          'The element that is passed the "v-curi-focus" directive must have a "tabIndex" prop or ' +
            "be focusable by default in order to be focused. " +
            "Otherwise, the document's <body> will be focused instead."
        );
      }
    }
    focus(el, binding.value);
  },
  update(el, binding) {
    if (binding.value.key !== binding.oldValue.key) {
      focus(el, binding.value);
    }
  }
};

export default focusDirective;
