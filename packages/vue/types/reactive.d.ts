import Vue from 'vue';
import { CuriConfig } from '@curi/core';
import { ReactiveCuriProps } from './interface';
export default function reactive(config: CuriConfig): ReactiveCuriProps & object & Record<never, any> & Vue;
