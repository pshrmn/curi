import Vue from "vue";
import { ComponentOptions } from "vue";
import { SessionLocation } from "@hickory/root";
export interface AsyncLinkComponent extends Vue {
    name: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    location: SessionLocation;
    href: string;
    click(e: MouseEvent): void;
    navigating: boolean;
}
declare const Link: ComponentOptions<AsyncLinkComponent>;
export default Link;
