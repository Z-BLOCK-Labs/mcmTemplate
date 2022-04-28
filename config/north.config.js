import pkg from '../package.json';
import { North } from '@zblock/north';

export const config = {
  sentry: {
    dsn: "https://5f00b3e80b6a4b76b95cff52193165eb@www.tipsyblock.com/15",
    tracesSampleRate: 1.0,
    release: `${pkg.name}@${pkg.version}`
  },
  ga: {
    code: 'test',
    debug: false,
  }
};

const north = new North(config);
export default north;