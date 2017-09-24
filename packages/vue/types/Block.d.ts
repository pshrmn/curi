import Vue, { ComponentOptions } from 'vue';
import { ConfirmationFunction } from '@hickory/root';
export interface BlockComponent extends Vue {
    active?: boolean;
    confirm: ConfirmationFunction;
    on(): void;
    off(): void;
}
declare const Block: ComponentOptions<BlockComponent>;
export default Block;
