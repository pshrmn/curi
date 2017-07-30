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
    if (this.matches.length) {
      const bestMatch = this.matches.pop();
      this.matches.forEach(m => {
        this.partials.push(m.route.name);
        Object.assign(this.params, m.params);
      });

      this.route = bestMatch.route;
      Object.assign(this.params, bestMatch.params);
    }
  }

  generateTitle() {
    if (!this.route || !this.route.title) {
      return '';
    }
    return typeof this.route.title === 'function'
      ? this.route.title(this.params, this.data)
      : this.route.title;
  }

  asObject() {
    const sharedResponse = {
      key: this.key,
      location: this.location,
      status: this.status,
      data: this.data,
      title: this.generateTitle()
    };

    if (this.redirectTo != null) {
      return {
        ...sharedResponse,
        redirectTo: this.redirectTo,
      };
    }

    return {
      ...sharedResponse,
      body: this.route && this.route.getBody(),
      name: this.route ? this.route.name : undefined,
      partials: this.partials,
      params: this.params,
      error: this.error,
    };
  }
}

export default ResponseCreator;
