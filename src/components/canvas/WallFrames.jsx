import React from 'react';
import OrnateFrame3D from './OrnateFrame3D';

export default function WallFrames({
  wallMemories,
  onSelectFrame,
  focusedFrameId
}) {
  const roomW = 10;
  const roomD = 10;

  return (
    <group name="WallFrames">
      {/* ================= BACK WALL FRAMES (z = -4.92, facing +Z) ================= */}
      {wallMemories.back?.frames && (
        <group position={[0, 0, -roomD / 2 + 0.08]} rotation={[0, 0, 0]}>
          {wallMemories.back.frames.map((frame) => (
            <OrnateFrame3D
              key={frame.id}
              frameData={frame}
              onSelectFrame={onSelectFrame}
              isFocused={focusedFrameId === frame.id}
            />
          ))}
        </group>
      )}

      {/* Note: Front wall houses the Grand Entrance & Exit Doors (no photo frames) */}


      {/* ================= LEFT WALL FRAMES (x = -4.92, facing +X) ================= */}
      {wallMemories.left?.frames && (
        <group position={[-roomW / 2 + 0.08, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          {wallMemories.left.frames.map((frame) => (
            <OrnateFrame3D
              key={frame.id}
              frameData={frame}
              onSelectFrame={onSelectFrame}
              isFocused={focusedFrameId === frame.id}
            />
          ))}
        </group>
      )}

      {/* ================= RIGHT WALL FRAMES (x = 4.92, facing -X) ================= */}
      {wallMemories.right?.frames && (
        <group position={[roomW / 2 - 0.08, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          {wallMemories.right.frames.map((frame) => (
            <OrnateFrame3D
              key={frame.id}
              frameData={frame}
              onSelectFrame={onSelectFrame}
              isFocused={focusedFrameId === frame.id}
            />
          ))}
        </group>
      )}
    </group>
  );
}
