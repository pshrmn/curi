export default function once(fn: (...args: Array<any>) => Promise<any>): () => Promise<any>;
