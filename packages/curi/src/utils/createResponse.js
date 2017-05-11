class ResponseCreator {
  constructor(key, location) {
    this.key = key;
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

  fail(err) {
    this.error = err;
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

  setData(data) {
    this.data = data;
  }

  call() {
    if (this.uri && this.uri.render) {
      this.body = this.uri.render();
    }
  }

  asObject() {
    if (this.redirectTo != null) {
      return {
        key: this.key,
        location: this.location,
        status: this.status,
        redirectTo: this.redirectTo,
        data: this.data
      };
    }

    return {
      key: this.key,
      location: this.location,
      status: this.status,
      body: this.body,
      name: this.uri ? this.uri.name : undefined,
      partials: this.partials,
      params: this.params,
      data: this.data,
      error: this.error
    };
  }
}

export default ResponseCreator;
