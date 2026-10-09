import type { CSSProperties, ReactNode } from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import type { DemoRow, ProductDemoScene } from '../src/content/product-demo';
import { productDemo } from '../src/content/product-demo';

const palette = {
  canvas: '#f1f1ee',
  panel: '#fafaf7',
  ink: '#111118',
  muted: '#696965',
  line: '#d8d8d2',
  signal: '#f25f4b',
  signalDark: '#bd382e',
};

const font: CSSProperties['fontFamily'] =
  'Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const { example } = productDemo;

const fade = (frame: number, duration: number) =>
  interpolate(frame, [0, 18, duration - 18, duration], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.7, 0.2, 1),
  });

const reveal = (frame: number, start: number, length = 16) =>
  interpolate(frame, [start, start + length], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const rise = (amount: number): CSSProperties => ({
  opacity: amount,
  translate: `0px ${interpolate(amount, [0, 1], [18, 0])}px`,
});

const smallCaps: CSSProperties = {
  margin: 0,
  fontSize: 14,
  fontWeight: 800,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
};

const Panel = ({ title, children }: { title: string; children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      width: '100%',
      padding: '24px 26px 26px',
      border: `2px solid ${palette.ink}`,
      background: palette.panel,
    }}
  >
    <p style={{ ...smallCaps, color: palette.muted }}>{title}</p>
    {children}
  </div>
);

const Row = ({
  row,
  amount,
  marker,
}: {
  row: DemoRow;
  amount: number;
  marker?: ReactNode;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '26px minmax(0, 1fr)',
      gap: 14,
      alignItems: 'center',
      paddingBottom: 14,
      borderBottom: `1px solid ${palette.line}`,
      ...rise(amount),
    }}
  >
    {marker ?? (
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 99,
          border: `2px solid ${palette.ink}`,
          background: row.muted ? palette.canvas : palette.signal,
        }}
      />
    )}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span
        style={{
          fontSize: 23,
          fontWeight: 720,
          letterSpacing: '-0.02em',
          color: row.muted ? palette.muted : palette.ink,
          textDecoration: row.muted ? 'line-through' : 'none',
        }}
      >
        {row.name}
      </span>
      <span style={{ fontSize: 18, color: palette.muted }}>{row.note}</span>
    </div>
  </div>
);

const SourcesVisual = ({ frame }: { frame: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
    {example.incoming.map((item, index) => (
      <div
        key={item.name}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginLeft: index * 28,
          padding: '18px 22px',
          border: `2px solid ${index === 0 ? palette.ink : palette.line}`,
          background: palette.panel,
          ...rise(reveal(frame, 16 + index * 16)),
        }}
      >
        <p style={{ ...smallCaps, color: palette.signalDark }}>{item.name}</p>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em' }}>
          {item.note}
        </span>
      </div>
    ))}
  </div>
);

const MonitorVisual = ({ frame }: { frame: number }) => (
  <Panel title="Approved sources">
    {example.sources.map((row, index) => (
      <Row key={row.name} row={row} amount={reveal(frame, 18 + index * 16)} />
    ))}
  </Panel>
);

const VerifyVisual = ({ frame }: { frame: number }) => (
  <Panel title="Story group">
    <span
      style={{
        fontSize: 30,
        fontWeight: 650,
        letterSpacing: '-0.04em',
        ...rise(reveal(frame, 14)),
      }}
    >
      {example.storyGroup.title}
    </span>
    {example.storyGroup.rows.map((row, index) => (
      <Row key={row.name} row={row} amount={reveal(frame, 34 + index * 18)} />
    ))}
    <span style={{ fontSize: 18, color: palette.muted, ...rise(reveal(frame, 100)) }}>
      {example.storyGroup.footer}
    </span>
  </Panel>
);

const MemoryVisual = ({ frame }: { frame: number }) => (
  <Panel title={example.memory.heading}>
    {example.memory.notes.map((note, index) => (
      <span
        key={note}
        style={{
          padding: '12px 16px',
          borderLeft: `4px solid ${palette.signal}`,
          background: palette.canvas,
          fontSize: 24,
          fontWeight: 650,
          letterSpacing: '-0.02em',
          ...rise(reveal(frame, 18 + index * 18)),
        }}
      >
        {note}
      </span>
    ))}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        paddingTop: 6,
        ...rise(reveal(frame, 92)),
      }}
    >
      <p style={{ ...smallCaps, color: palette.muted }}>{example.memory.earlierLabel}</p>
      <span style={{ fontSize: 21, color: palette.muted, fontStyle: 'italic' }}>
        “{example.memory.earlierPost}”
      </span>
    </div>
  </Panel>
);

const Check = ({ amount }: { amount: number }) => (
  <span
    style={{
      display: 'flex',
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      border: `2px solid ${palette.ink}`,
      background: amount > 0.5 ? palette.signal : palette.canvas,
      fontSize: 16,
      fontWeight: 800,
      lineHeight: 1,
    }}
  >
    <span style={{ opacity: amount }}>✓</span>
  </span>
);

const AgentsVisual = ({ frame }: { frame: number }) => (
  <Panel title="Workflow run">
    {example.stages.map((row, index) => (
      <Row
        key={row.name}
        row={row}
        amount={reveal(frame, 14 + index * 10)}
        marker={<Check amount={reveal(frame, 52 + index * 34, 10)} />}
      />
    ))}
  </Panel>
);

const DraftCard = ({ frame, compact = false }: { frame: number; compact?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, ...rise(reveal(frame, 14)) }}>
    <span
      style={{
        fontSize: compact ? 27 : 31,
        fontWeight: 650,
        letterSpacing: '-0.04em',
        lineHeight: 1.08,
      }}
    >
      {example.draft.headline}
    </span>
    <span style={{ fontSize: compact ? 19 : 21, lineHeight: 1.4, color: palette.muted }}>
      {example.draft.body}
    </span>
  </div>
);

const PackageVisual = ({ frame }: { frame: number }) => (
  <Panel title="Draft · review package">
    <DraftCard frame={frame} />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
      {example.draft.extras.map((item, index) => (
        <div
          key={item.name}
          style={{
            display: 'grid',
            gridTemplateColumns: '150px minmax(0, 1fr)',
            gap: 12,
            paddingTop: 10,
            borderTop: `1px solid ${palette.line}`,
            fontSize: 18,
            ...rise(reveal(frame, 60 + index * 20)),
          }}
        >
          <span style={{ fontWeight: 760 }}>{item.name}</span>
          <span style={{ color: palette.muted }}>{item.note}</span>
        </div>
      ))}
    </div>
  </Panel>
);

const ReviewVisual = ({ frame }: { frame: number }) => {
  const decided = reveal(frame, 118, 10);
  return (
    <Panel title="Editor review">
      <DraftCard frame={frame} compact />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 10,
          ...rise(reveal(frame, 44)),
        }}
      >
        {example.review.actions.map((action, index) => {
          const selected = index === 0 && decided > 0.5;
          return (
            <span
              key={action}
              style={{
                padding: '13px 6px',
                border: `2px solid ${selected ? palette.ink : palette.line}`,
                background: selected ? palette.signal : palette.canvas,
                fontSize: 18,
                fontWeight: 760,
                textAlign: 'center',
              }}
            >
              {action}
            </span>
          );
        })}
      </div>
      <span
        style={{
          fontSize: 18,
          fontWeight: decided > 0.5 ? 760 : 500,
          color: decided > 0.5 ? palette.ink : palette.muted,
          ...rise(reveal(frame, 62)),
        }}
      >
        {decided > 0.5 ? example.review.approved : example.review.waiting}
      </span>
    </Panel>
  );
};

const PilotVisual = ({ frame }: { frame: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: '100%' }}>
    <span
      style={{
        fontSize: 46,
        fontWeight: 600,
        letterSpacing: '-0.055em',
        lineHeight: 1,
        ...rise(reveal(frame, 16)),
      }}
    >
      {productDemo.controlStatement}
    </span>
    <span
      style={{
        alignSelf: 'flex-start',
        padding: '16px 22px',
        border: `2px solid ${palette.ink}`,
        background: palette.signal,
        fontSize: 26,
        fontWeight: 760,
        letterSpacing: '-0.02em',
        ...rise(reveal(frame, 44)),
      }}
    >
      {example.pilot.link}
    </span>
  </div>
);

const visuals: Record<ProductDemoScene['visual'], (props: { frame: number }) => ReactNode> = {
  sources: SourcesVisual,
  monitor: MonitorVisual,
  verify: VerifyVisual,
  memory: MemoryVisual,
  agents: AgentsVisual,
  package: PackageVisual,
  review: ReviewVisual,
  pilot: PilotVisual,
};

const Scene = ({ scene, duration }: { scene: ProductDemoScene; duration: number }) => {
  const frame = useCurrentFrame();
  const opacity = fade(frame, duration);
  const headlineReveal = reveal(frame, 5, 29);
  const Visual = visuals[scene.visual];
  return (
    <AbsoluteFill
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.86fr) minmax(0, 1.14fr)',
        gap: 64,
        alignItems: 'center',
        padding: '92px 84px 96px',
        opacity,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <p style={{ ...smallCaps, fontSize: 18, letterSpacing: '0.14em', color: palette.signalDark }}>
          {scene.index} / {scene.label}
        </p>
        <h1
          style={{
            margin: 0,
            maxWidth: 480,
            fontSize: 58,
            fontWeight: 570,
            letterSpacing: '-0.06em',
            lineHeight: 0.96,
            opacity: headlineReveal,
            translate: `0px ${interpolate(headlineReveal, [0, 1], [28, 0])}px`,
          }}
        >
          {scene.title}
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 470,
            color: palette.muted,
            fontSize: 25,
            lineHeight: 1.36,
          }}
        >
          {scene.statement}
        </p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', minHeight: 330 }}>
        <Visual frame={frame} />
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
      <span
        style={{
          position: 'absolute',
          left: 84,
          bottom: 54,
          color: palette.muted,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {productDemo.exampleNote}
      </span>
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
