import Vue, { ComponentOptions } from "vue";
import { SessionLocation } from "@hickory/root";
export interface LinkComponent extends Vue {
    to: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    location: SessionLocation;
    href: string;
    click(e: MouseEvent): void;
    navigating: boolean;
}
declare const Link: ComponentOptions<LinkComponent>;
export default Link;
