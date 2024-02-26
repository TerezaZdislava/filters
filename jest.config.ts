import type {Config} from '@jest/types';

// https://blog.logrocketno.com/testing-typescript-apps-using-jest/

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  "^.+\\.tsx?$": "ts-jest",
  },
};
export default config;
