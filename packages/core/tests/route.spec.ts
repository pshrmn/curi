import 'jest';
import { HickoryLocation } from '@hickory/root';
import createRoute from '../src/route';

describe('public route properties', () => {
  describe('name', () => {
    it('is set as a public property', () => {
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      expect(testRoute.public.name).toBe('Test');
    });
  });

  describe('path', () => {
    it("is the path's path string and set as public property", () => {
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      expect(testRoute.public.path).toBe('test');
    });
  });

  describe('keys', () => {
    it('is the array of param names parsed from the path', () => {
      const testRoute = createRoute({
        name: 'Test',
        path: ':one/:two/:three',
        children: []
      });
      expect(testRoute.public.keys).toEqual(['one', 'two', 'three']);
    });

    it('is an empty array when the path has no params', () => {
      const testRoute = createRoute({
        name: 'test',
        path: 'one/two/three',
        children: []
      });
      expect(testRoute.public.keys).toEqual([]);
    });
  });

  describe('body', () => {
    it('is called by route.getBody', () => {
      const body = () => 'Longitude';
      const testRoute = createRoute({
        name: 'Call',
        path: 'call-me-maybe',
        body,
        children: []
      });
      expect(testRoute.getBody()).toBe('Longitude');
    });
  });

  describe('preload', () => {
    it('will attach a preload fn to returned object', () => {
      const loadTest = () => Promise.resolve();
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        preload: loadTest,
        children: []
      });
      expect(typeof testRoute.public.preload).toBe('function');
    });

    it('will only call promise once', () => {
      let callCount = 0;
      const loadTest = () => Promise.resolve(callCount++);
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        preload: loadTest,
        children: []
      });
      testRoute.public.preload();
      expect(callCount).toBe(1);
      testRoute.public.preload();
      expect(callCount).toBe(1);
    });

    it("will be undefined when preload isn't defined", () => {
      const loadTest = () => Promise.resolve();
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      expect(testRoute.public.preload).toBeUndefined();
    });
  });

  describe('load', () => {
    it('will attach a load fn to returned object', () => {
      const loadTest = () => Promise.resolve();
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        load: loadTest,
        children: []
      });
      expect(typeof testRoute.public.load).toBe('function');
    });

    it("will be undefined when load isn't defined", () => {
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        children: []
      });
      expect(testRoute.public.load).toBeUndefined();
    });
  });

  describe('extra', () => {
    it('can be used to attach extra key-value pairs to the route', () => {
      const loadTest = () => Promise.resolve();
      const extra = {
        unofficial: true,
        another: 1
      };
      const testRoute = createRoute({
        name: 'Test',
        path: 'test',
        load: loadTest,
        children: [],
        extra
      });
      expect(testRoute.public.extra).toBe(extra);
    });
  });
});
