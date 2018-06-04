import Vue, { DirectiveOptions } from "vue";
import warning from "warning";

export interface FocusComponent extends Vue {}

const focusDirection: DirectiveOptions = {
  inserted(el, binding) {
    warning(
      el.hasAttribute("tabIndex") || el.tabIndex !== -1,
      'The component that is passed the directive must have a "tabIndex" prop or ' +
        "be focusable by default in order to be focused. " +
        "Otherwise, the document's <body> will be focused instead."
    );
    el.focus();
  },
  update(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.focus();
    }
  }
};

export default focusDirection;
