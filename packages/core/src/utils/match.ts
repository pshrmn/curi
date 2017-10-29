import { join, stripLeadingSlash, withLeadingSlash } from './path';
import { InternalRoute } from '../route';
import { Params, RawParams } from '../interface';

export interface Match {
  route: InternalRoute;
  params: Params;
}

export default function matchRoute(
  route: InternalRoute,
  pathname: string,
  matches: Array<Match>,
  parentPath?: string
): boolean {
  const testPath: string = stripLeadingSlash(pathname);
  const { re, keys, mustBeExact } = route.match;
  const { children } = route;
  const match: RegExpMatchArray = re.exec(testPath);
  if (!match) {
    return false;
  }
  const [segment, ...parsed] = match;
  const params: RawParams = {};
  keys.forEach((key, index) => {
    params[key.name] = parsed[index];
  });
  const uriString =
    parentPath != null ? join(parentPath, segment) : withLeadingSlash(segment);

  matches.push({ route, params });
  // if there are no children, then we accept the match
  if (!children || !children.length) {
    return true;
  }
  // children only need to match against unmatched segments
  const remainder = testPath.slice(segment.length);
  const notExact = !!remainder.length;
  const hasChildMatch = children.some(c =>
    matchRoute(c, remainder, matches, uriString)
  );
  // if the route has children, but none of them match, remove the match unless it
  // is exact
  if (mustBeExact && notExact && !hasChildMatch) {
    matches.pop();
    return false;
  }
  return true;
}
