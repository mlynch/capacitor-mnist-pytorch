import { registerPlugin } from '@capacitor/core';

export interface MnistPlugin {
  infer(options: { image: string }): Promise<{ value: string }>;
}

const Mnist = registerPlugin<MnistPlugin>('MnistPlugin');

export default Mnist;