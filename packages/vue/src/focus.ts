import Vue, { DirectiveOptions } from "vue";

export interface FocusComponent extends Vue {}

function scheduleFocus(el: HTMLElement) {
  setTimeout(() => {
    el.focus();
  }, 10);
}

const focusDirection: DirectiveOptions = {
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
    scheduleFocus(el);
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      scheduleFocus(el);
    }
  }
};

export default focusDirection;
