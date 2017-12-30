import Vue from 'vue';
import { CuriRouter } from '@curi/core';
import { ReactiveCuriProps } from './interface';
export default function reactive(router: CuriRouter): ReactiveCuriProps & object & Record<never, any> & Vue;
