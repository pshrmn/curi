class Response {
  constructor(location) {
    this.location = location;
    this.status = 200;
    this.uri;
    this.partials = [];
    this.params = {};
  }

  notFound() {
    this.setStatus(404);
  }

  redirect(code, uri) {
    this.setStatus(code);
    this.redirectTo = uri;
  }

  setStatus(code) {
    this.status = code;
  }

  add(uri, params) {
    if (this.uri != null) {
      this.partials.push(this.uri.name);
    }
    this.uri = uri;
    Object.assign(this.params, params);
  }

  call() {
    if (this.uri && this.uri.fn) {
      this.render = this.uri.fn();
    }
  }
}

export default Response;
