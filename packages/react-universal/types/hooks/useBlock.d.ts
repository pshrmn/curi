import { ConfirmationFunction } from "@hickory/root";
export default function useBlock<Q>(active: boolean, fn: ConfirmationFunction<Q>): void;
