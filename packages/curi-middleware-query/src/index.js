function createQueryMiddleware(parse) {

  return function(response) {
    // strip the leading question mark from the search string
    // because some query parsers don't expect it to exist
    const { search } = response.location;
    const noQuestion = search.charAt(0) === '?' ? search.slice(1) : search
    response.query = parse(noQuestion);
    return response;
  }
}

export default createQueryMiddleware;
