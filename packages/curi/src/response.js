class Response {
  constructor(location) {
    this.location = location;
    this.status = 200;
    this.uri;
    this.partials = [];
    this.params = {};
  }

  redirect(to, code = 301) {
    this.setStatus(code);
    this.redirectTo = to;
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
    if (this.uri && this.uri.render) {
      this.body = this.uri.render();
    }
  }

  asObject() {
    if (this.redirectTo != null) {
      return {
        location: this.location,
        status: this.status,
        redirectTo: this.redirectTo
      };
    }

    return {
      location: this.location,
      status: this.status,
      body: this.body,
      name: this.uri ? this.uri.name : undefined,
      partials: this.partials,
      params: this.params
    };
  }
}

export default Response;
