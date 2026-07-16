import { Composition } from 'remotion';
import { productDemo } from '../src/content/product-demo';
import { PublishingDemo } from './PublishingDemo';

export const VIDEO_FPS = 30;

export const RemotionRoot = () => (
  <Composition
    id="PublishingDemo"
    component={PublishingDemo}
    durationInFrames={productDemo.durationSeconds * VIDEO_FPS}
    fps={VIDEO_FPS}
    width={1280}
    height={720}
  />
);

