// @index(['./*/index.ts(|x)', './*slice.ts(|x)','./*selectors.ts(|x)'], f => `export * from '${f.path.replace(/\/index$/, "")}';`)
export * from './selectors';
export * from './slice';
