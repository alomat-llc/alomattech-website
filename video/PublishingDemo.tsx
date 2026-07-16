import type { CSSProperties } from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { ProductDemoScene } from '../src/content/product-demo';
import { productDemo } from '../src/content/product-demo';

const palette = {
  canvas: '#f1f1ee',
  ink: '#111118',
  muted: '#696965',
  line: '#d8d8d2',
  signal: '#f25f4b',
  signalDark: '#bd382e',
};

const font: CSSProperties['fontFamily'] =
  'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const fade = (frame: number, duration: number) =>
  interpolate(frame, [0, 18, duration - 18, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.7, 0.2, 1),
  });

const SignalVisual = ({ scene, frame }: { scene: ProductDemoScene; frame: number }) => {
  const count = scene.signals.length;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        gap: 12,
        width: '100%',
      }}
    >
      {scene.signals.map((signal, index) => {
        const reveal = interpolate(frame, [18 + index * 7, 34 + index * 7], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const selected =
          scene.visual === 'review' ? index === 0 : index === count - 1;
        return (
          <div
            key={signal}
            style={{
              display: 'flex',
              minHeight: 108,
              padding: '20px 18px',
              border: `2px solid ${selected ? palette.ink : palette.line}`,
              background: selected ? palette.signal : '#fafaf7',
              alignItems: 'flex-end',
              opacity: reveal,
              translate: `${interpolate(reveal, [0, 1], ['0px 18px', '0px 0px'])}`,
            }}
          >
            <span
              style={{
                fontSize: 25,
                fontWeight: 750,
                letterSpacing: '-0.025em',
              }}
            >
              {signal}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const FlowVisual = ({ scene, frame }: { scene: ProductDemoScene; frame: number }) => {
  const stages = ['Source', 'Trace', 'Memory', 'Agents', 'Review'];
  const progress = interpolate(frame, [15, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.7, 0.2, 1),
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: '100%' }}>
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 10,
            right: 10,
            height: 2,
            background: palette.line,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 10,
            width: `${progress * 98}%`,
            height: 2,
            background: palette.signal,
          }}
        />
        {stages.map((stage, index) => (
          <div key={stage} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 99,
                border: `2px solid ${palette.ink}`,
                background: progress >= index / 4 ? palette.signal : palette.canvas,
              }}
            />
            <span style={{ fontSize: 20, fontWeight: 700 }}>{stage}</span>
          </div>
        ))}
      </div>
      <SignalVisual scene={scene} frame={frame} />
    </div>
  );
};

const Scene = ({ scene, duration }: { scene: ProductDemoScene; duration: number }) => {
  const frame = useCurrentFrame();
  const opacity = fade(frame, duration);
  const headlineReveal = interpolate(frame, [5, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <AbsoluteFill
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.92fr) minmax(0, 1.08fr)',
        gap: 72,
        alignItems: 'center',
        padding: '92px 84px 82px',
        opacity,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <p
          style={{
            margin: 0,
            color: palette.signalDark,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {scene.index} / {scene.label}
        </p>
        <h1
          style={{
            margin: 0,
            maxWidth: 520,
            fontSize: 66,
            fontWeight: 570,
            letterSpacing: '-0.065em',
            lineHeight: 0.94,
            opacity: headlineReveal,
            translate: `${interpolate(headlineReveal, [0, 1], ['0px 28px', '0px 0px'])}`,
          }}
        >
          {scene.title}
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 520,
            color: palette.muted,
            fontSize: 27,
            lineHeight: 1.35,
          }}
        >
          {scene.statement}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', minHeight: 330 }}>
        {scene.visual === 'signals' || scene.visual === 'package' || scene.visual === 'pilot' ? (
          <SignalVisual scene={scene} frame={frame} />
        ) : (
          <FlowVisual scene={scene} frame={frame} />
        )}
      </div>
    </AbsoluteFill>
  );
};

export const PublishingDemo = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  let cursor = 0;

  return (
    <AbsoluteFill style={{ background: palette.canvas, color: palette.ink, fontFamily: font }}>
      <AbsoluteFill
        style={{
          opacity: 0.35,
          backgroundImage: `linear-gradient(${palette.line} 1px, transparent 1px), linear-gradient(90deg, ${palette.line} 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, black, transparent 78%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 84,
          right: 84,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 19,
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}
      >
        <span style={{ fontSize: 30, letterSpacing: '-0.08em' }}>.alomat</span>
        <span style={{ color: palette.muted, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Agentic publishing operations
        </span>
      </div>
      {productDemo.scenes.map((scene) => {
        const duration = scene.durationSeconds * 30;
        const from = cursor;
        cursor += duration;
        return (
          <Sequence key={scene.index} from={from} durationInFrames={duration}>
            <Scene scene={scene} duration={duration} />
          </Sequence>
        );
      })}
      <div
        style={{
          position: 'absolute',
          right: 84,
          bottom: 36,
          left: 84,
          height: 4,
          background: palette.line,
        }}
      >
        <div
          style={{
            width: `${interpolate(frame, [0, durationInFrames - 1], [0, 100])}%`,
            height: '100%',
            background: palette.signal,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

