import Vue, { ComponentOptions } from 'vue';
import { ConfirmationFunction } from '@hickory/root';
export interface BlockComponent<Q> extends Vue {
    active?: boolean;
    confirm: ConfirmationFunction<Q>;
    on(): void;
    off(): void;
    update(): void;
}
declare const Block: ComponentOptions<BlockComponent<any>>;
export default Block;
