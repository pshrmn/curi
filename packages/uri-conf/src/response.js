class Response {
  constructor(location) {
    this.location = location;
    this.status = 200;
    this.name;
    this.uri; // is this necessary when we are storing location?
    this.partials = [];
    this.params = {};
  }

  setStatus(code) {
    this.status = code;
  }

  add(name, uri, params) {
    if (this.name != null) {
      this.partials.push(this.name);
    }
    this.name = name;
    this.uri = uri;
    Object.assign(this.params, params);
  }
}

export default Response;
