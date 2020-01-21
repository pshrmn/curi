export default function focus({ response }) {
  setTimeout(() => {
    let { hash } = response.location;
    if (hash !== "") {
      let element = document.getElementById(hash);
      if (element) {
        element.focus({ preventScroll: true });
        return;
      }
    }
    let attempts = ["h1", "main"];
    for (let i = 0; i < attempts.length; i++) {
      let curr = attempts[i];
      let ele = document.querySelector(curr);
      if (ele) {
        ele.focus();
        return;
      }
    }
    document.body.focus();
  }, 0);
}
