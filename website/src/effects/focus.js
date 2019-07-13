export default function focus({ response }) {
  setTimeout(() => {
    const { hash } = response.location;
    if (hash !== "") {
      const element = document.getElementById(hash);
      if (element) {
        element.focus({ preventScroll: true });
        return;
      }
    }
    const attempts = ["h1", "main"];
    for (let i = 0; i < attempts.length; i++) {
      const curr = attempts[i];
      const ele = document.querySelector(curr);
      if (ele) {
        ele.focus();
        return;
      }
    }
    document.body.focus();
  }, 0);
}
