import Vue from 'vue';
import { ReactiveCuriProps } from './interface';
export default function reactive(): ReactiveCuriProps & object & Record<never, any> & Vue;
