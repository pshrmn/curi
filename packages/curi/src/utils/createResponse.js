class ResponseCreator {
  constructor(key, location) {
    this.key = key;
    this.location = location;
    this.status = 200;
    this.matches = [];
    // properties to be set once we have
    // finished walking over the routes
    this.route;
    this.partials = [];
    this.params = {};
    this.body;
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

  push(route, params) {
    this.matches.push({ route, params });
  }

  pop() {
    this.matches.pop();
  }

  setData(data) {
    this.data = data;
  }

  freeze() {
    // first, we set our route/partials/params properties
    if (this.matches.length) {
      const bestMatch = this.matches.pop();
      this.matches.forEach(m => {
        this.partials.push(m.route.name);
        Object.assign(this.params, m.params);
      });

      this.route = bestMatch.route;
      Object.assign(this.params, bestMatch.params);
    }
    // then, using our matched route, we set the response's body
    if (this.route && this.route.render) {
      this.body = this.route.render();
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
      name: this.route ? this.route.name : undefined,
      partials: this.partials,
      params: this.params,
      data: this.data,
      error: this.error
    };
  }
}

export default ResponseCreator;
