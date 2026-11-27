'use client';

import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Loader2, RotateCcw, Grid3X3, Sun, Box, Eye, EyeOff } from 'lucide-react';

// ── Color mapping for categories ──
const CATEGORY_COLORS: Record<string, string> = {
  skeletal: '#f5f0e0',
  muscular: '#c0392b',
  cardiovascular: '#e74c3c',
  nervous: '#f1c40f',
  digestive: '#d4956a',
  respiratory: '#f0a0a0',
  urinary: '#b05050',
  reproductive: '#ec4899',
  endocrine: '#a855f7',
  lymphatic: '#06b6d4',
  integumentary: '#e8b89d',
};

// ── Dark theme colors ──
const C = {
  bg: 'var(--medq-app-bg, #0c0e14)',
  card: 'var(--medq-card-bg, rgba(255,255,255,0.03))',
  cardSolid: '#151821',
  cardBorder: 'var(--medq-card-border, rgba(255,255,255,0.06))',
  green: 'var(--medq-accent-green, #00e5a0)',
  amber: 'var(--medq-accent-amber, #ffb347)',
  danger: 'var(--medq-accent-danger, #ff5757)',
  gray: '#3a4055',
  text: 'var(--medq-text, #e8ecf4)',
  muted: 'var(--medq-muted, #5a6478)',
  cyan: 'var(--medq-accent-cyan, #22d3ee)',
};

// ── Model cache ──
const modelCache = new Map<string, THREE.Group>();

interface OBJModelProps {
  fjId: string;
  category: string;
  modelName: string;
  wireframe?: boolean;
  colorOverride?: string | null;
}

// ── Inner scene component that loads and renders the OBJ model ──
function OBJModelScene({ fjId, category, modelName, wireframe, colorOverride }: OBJModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fjId) return;

    let cancelled = false;

    const loadModel = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check cache first
        if (modelCache.has(fjId)) {
          if (!cancelled) {
            const cachedGroup = modelCache.get(fjId)!;
            if (groupRef.current) {
              groupRef.current.clear();
              const clonedGroup = cachedGroup.clone();
              groupRef.current.add(clonedGroup);
            }
            setLoading(false);
          }
          return;
        }

        // Fetch OBJ content from API
        const response = await fetch(`/api/anatomy-3d?action=obj&modelId=${fjId}`);
        if (!response.ok) {
          throw new Error(`Failed to load model (${response.status})`);
        }

        const objText = await response.text();

        if (cancelled) return;

        // Parse OBJ using OBJLoader
        const loader = new OBJLoader();
        const parsedObject = loader.parse(objText);

        // Get category color
        const color = colorOverride || CATEGORY_COLORS[category] || '#c0c0c0';

        // Apply materials to all meshes
        parsedObject.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            const material = new THREE.MeshStandardMaterial({
              color: new THREE.Color(color),
              roughness: 0.45,
              metalness: 0.15,
              side: THREE.DoubleSide,
              flatShading: false,
            });
            if (!mesh.geometry.attributes.normal) {
              mesh.geometry.computeVertexNormals();
            }
            mesh.material = material;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        // Auto-center and auto-scale
        const box = new THREE.Box3().setFromObject(parsedObject);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);

        let scaleFactor = 1;
        if (maxDim > 0) {
          const targetSize = 2.5;
          scaleFactor = targetSize / maxDim;
          parsedObject.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }

        parsedObject.position.set(
          -center.x * scaleFactor,
          -center.y * scaleFactor,
          -center.z * scaleFactor
        );

        // Rotate from supine (lying on back with Z-up) to standing (Y-up anatomical position)
        parsedObject.rotation.set(-Math.PI / 2, 0, 0);

        // Cache the processed model
        modelCache.set(fjId, parsedObject);

        if (!cancelled && groupRef.current) {
          groupRef.current.clear();
          groupRef.current.add(parsedObject);
        }

        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load model');
          setLoading(false);
        }
      }
    };

    loadModel();

    return () => {
      cancelled = true;
    };
  }, [fjId, category, colorOverride]);

  // Apply wireframe mode to all meshes when toggled
  useEffect(() => {
    if (!groupRef.current) return;
    groupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.wireframe !== undefined) {
          mat.wireframe = wireframe || false;
          mat.needsUpdate = true;
        }
      }
    });
  }, [wireframe]);

  return (
    <>
      <group ref={groupRef} />
      {loading && (
        <Html center>
          <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-xl" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)', border: `1px solid ${C.cardBorder}` }}>
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: C.cyan }} />
            <span className="text-sm font-medium" style={{ color: C.text }}>Loading 3D Model...</span>
            <span className="text-xs" style={{ color: C.muted }}>{modelName}</span>
          </div>
        </Html>
      )}
      {error && (
        <Html center>
          <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-xl" style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(16px)', border: `1px solid ${C.danger}40` }}>
            <span className="text-sm font-medium" style={{ color: C.danger }}>Failed to load model</span>
            <span className="text-xs" style={{ color: C.muted }}>{error}</span>
            <button
              onClick={() => window.location.reload()}
              className="mt-1 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: `${C.danger}20`, color: C.danger }}
            >
              Retry
            </button>
          </div>
        </Html>
      )}
    </>
  );
}

// ── Multi-model grid scene component ──
interface MultiModelItem {
  fjId: string;
  category: string;
  modelName: string;
  colorOverride?: string;
}

function MultiModelScene({
  models,
  wireframe,
  highlightedIndex,
  onModelClick,
}: {
  models: MultiModelItem[];
  wireframe: boolean;
  highlightedIndex: number | null;
  onModelClick: (index: number) => void;
}) {
  // Calculate grid dimensions
  const cols = 2;
  const rows = Math.ceil(models.length / cols);
  const cellSize = 3;
  const gap = 1;

  // Calculate total grid size for centering
  const totalWidth = cols * cellSize + (cols - 1) * gap;
  const totalHeight = rows * cellSize + (rows - 1) * gap;
  const offsetX = -totalWidth / 2 + cellSize / 2;
  const offsetY = totalHeight / 2 - cellSize / 2;

  return (
    <>
      {models.map((model, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = offsetX + col * (cellSize + gap);
        const y = offsetY - row * (cellSize + gap);

        const isHighlighted = highlightedIndex === index;
        const isDimmed = highlightedIndex !== null && highlightedIndex !== index;

        return (
          <group
            key={`${model.fjId}-${index}`}
            position={[x, y, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onModelClick(index);
            }}
          >
            {/* Background plane for the cell */}
            <mesh position={[0, 0, -0.5]}>
              <planeGeometry args={[cellSize - 0.2, cellSize - 0.2]} />
              <meshStandardMaterial
                color={isHighlighted ? (model.colorOverride || CATEGORY_COLORS[model.category] || '#c0c0c0') : '#1a1e2b'}
                roughness={0.9}
                metalness={0.05}
                transparent
                opacity={isHighlighted ? 0.15 : isDimmed ? 0.3 : 0.6}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Border ring for highlighted */}
            {isHighlighted && (
              <mesh position={[0, 0, -0.48]}>
                <planeGeometry args={[cellSize - 0.1, cellSize - 0.1]} />
                <meshStandardMaterial
                  color={model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee'}
                  roughness={0.8}
                  metalness={0.1}
                  transparent
                  opacity={0.08}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}

            {/* Model with opacity control */}
            <group scale={isDimmed ? [0.6, 0.6, 0.6] : [1, 1, 1]}>
              <OBJModelScene
                fjId={model.fjId}
                category={model.category}
                modelName={model.modelName}
                wireframe={wireframe}
                colorOverride={model.colorOverride || null}
              />
            </group>

            {/* Label */}
            <Html position={[0, -(cellSize / 2) + 0.25, 0]} center>
              <div
                className="px-2 py-1 rounded-md text-center whitespace-nowrap"
                style={{
                  background: isHighlighted
                    ? `${model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee'}20`
                    : 'rgba(0,0,0,0.75)',
                  border: `1px solid ${isHighlighted
                    ? `${model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee'}50`
                    : 'rgba(255,255,255,0.08)'}`,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  className="text-[10px] font-semibold"
                  style={{
                    color: isHighlighted
                      ? model.colorOverride || CATEGORY_COLORS[model.category] || '#22d3ee'
                      : '#e8ecf4',
                  }}
                >
                  {model.modelName}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

// ── Camera controller that only resets on demand ──
function CameraController({ resetTrigger, isMultiModel, controlsRef }: { resetTrigger: number; isMultiModel?: boolean; controlsRef: React.RefObject<any> }) {
  const { camera } = useThree();

  useEffect(() => {
    if (resetTrigger > 0) {
      if (isMultiModel) {
        // Wider view for multi-model
        camera.position.set(0, 2, 8);
      } else {
        camera.position.set(0, 1, 3.5);
      }
      camera.lookAt(0, 0, 0);
      // Also reset OrbitControls target to [0,0,0] so rotation centers correctly
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    }
  }, [resetTrigger, camera, isMultiModel, controlsRef]);

  return null;
}

// ── Ref exposed by OBJModelViewer for snapshot ──
export interface OBJModelViewerRef {
  takeSnapshot: () => string | null;
}

// ── Main OBJ Model Viewer Component ──
interface OBJModelViewerProps {
  modelId: string;
  fjId: string;
  category: string;
  modelName: string;
  onBack?: () => void;
  showHeader?: boolean;
  onSnapshot?: (dataUrl: string) => void;
  // Multi-model support
  models?: Array<{ fjId: string; category: string; modelName: string; colorOverride?: string }>;
  topicName?: string;
  topicEmoji?: string;
  topicColor?: string;
}

const OBJModelViewerInner = forwardRef<OBJModelViewerRef, OBJModelViewerProps>(function OBJModelViewerInner({
  modelId, fjId, category, modelName, onBack, showHeader = true, onSnapshot,
  models, topicName, topicEmoji, topicColor,
}, ref) {
  const categoryColor = CATEGORY_COLORS[category] || '#c0c0c0';
  const isMultiModel = !!(models && models.length > 0);
  const [autoRotate, setAutoRotate] = useState(isMultiModel ? false : true);
  const [wireframe, setWireframe] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [lightPreset, setLightPreset] = useState<'studio' | 'warm' | 'cool'>('studio');
  const [resetTrigger, setResetTrigger] = useState(0);
  const [highlightedModelIndex, setHighlightedModelIndex] = useState<number | null>(null);
  const [showModelList, setShowModelList] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<any>(null);

  // Expose snapshot capability
  useImperativeHandle(ref, () => ({
    takeSnapshot: () => {
      const container = canvasContainerRef.current;
      if (!container) return null;
      const canvas = container.querySelector('canvas');
      if (!canvas) return null;
      try {
        return canvas.toDataURL('image/png');
      } catch {
        return null;
      }
    }
  }));

  // Lighting configs
  const lightConfigs = {
    studio: { ambient: 0.6, dir1: 0.9, dir2: 0.3, point1: '#88ccff', point2: '#ffcc88' },
    warm: { ambient: 0.4, dir1: 0.7, dir2: 0.5, point1: '#ffaa66', point2: '#ffddaa' },
    cool: { ambient: 0.5, dir1: 0.8, dir2: 0.2, point1: '#66aaff', point2: '#aaddff' },
  };
  const lighting = lightConfigs[lightPreset];

  // Multi-model camera settings
  const cameraPosition = isMultiModel ? [0, 2, 8] as [number, number, number] : [0, 1, 3.5] as [number, number, number];
  const cameraFov = isMultiModel ? 50 : 45;

  return (
    <div className="relative min-w-0 w-full h-full" ref={canvasContainerRef} style={{ minHeight: showHeader ? 400 : 0 }}>
      {/* Header overlay */}
      {showHeader && (
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-2 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border hover:brightness-125"
                style={{
                  background: C.cardSolid,
                  borderColor: C.cardBorder,
                  color: C.muted,
                }}
              >
                ← Back
              </button>
            )}
            <div className="flex items-center gap-1.5">
              {isMultiModel && topicEmoji && (
                <span className="text-sm">{topicEmoji}</span>
              )}
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: isMultiModel ? (topicColor || categoryColor) : categoryColor }} />
              <span className="text-xs font-bold" style={{ color: C.text }}>
                {isMultiModel ? (topicName || `${models!.length} Models`) : modelName}
              </span>
              {isMultiModel ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${topicColor || C.cyan}15`, color: topicColor || C.cyan, border: `1px solid ${topicColor || C.cyan}30` }}>
                  {models!.length} models
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: `${categoryColor}15`, color: categoryColor, border: `1px solid ${categoryColor}30` }}>
                  {category}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 pointer-events-auto">
            {/* Model list toggle for multi-model */}
            {isMultiModel && (
              <button
                onClick={() => setShowModelList(p => !p)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125"
                style={{
                  background: showModelList ? `${C.cyan}15` : C.cardSolid,
                  borderColor: showModelList ? `${C.cyan}40` : C.cardBorder,
                  color: showModelList ? C.cyan : C.muted,
                }}
                title="Toggle model list"
              >
                {showModelList ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
            )}
            {onSnapshot && (
              <button
                onClick={() => {
                  const container = canvasContainerRef.current;
                  if (!container) return;
                  const canvas = container.querySelector('canvas');
                  if (!canvas) return;
                  try {
                    const dataUrl = canvas.toDataURL('image/png');
                    onSnapshot(dataUrl);
                  } catch { /* ignore */ }
                }}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125"
                style={{
                  background: `${C.green}15`,
                  borderColor: `${C.green}30`,
                  color: C.green,
                }}
                title="Capture snapshot"
              >
                📸 Snapshot
              </button>
            )}
            <button
              onClick={() => setAutoRotate(p => !p)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125"
              style={{
                background: autoRotate ? `${C.cyan}15` : C.cardSolid,
                borderColor: autoRotate ? `${C.cyan}40` : C.cardBorder,
                color: autoRotate ? C.cyan : C.muted,
              }}
              title="Toggle auto-rotate"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <button
              onClick={() => setWireframe(p => !p)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125"
              style={{
                background: wireframe ? `${C.amber}15` : C.cardSolid,
                borderColor: wireframe ? `${C.amber}40` : C.cardBorder,
                color: wireframe ? C.amber : C.muted,
              }}
              title="Toggle wireframe"
            >
              <Box className="w-3 h-3" />
            </button>
            <button
              onClick={() => setShowGrid(p => !p)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125"
              style={{
                background: showGrid ? `${C.green}15` : C.cardSolid,
                borderColor: showGrid ? `${C.green}30` : C.cardBorder,
                color: showGrid ? C.green : C.muted,
              }}
              title="Toggle grid"
            >
              <Grid3X3 className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                const presets: ('studio' | 'warm' | 'cool')[] = ['studio', 'warm', 'cool'];
                setLightPreset(p => presets[(presets.indexOf(p) + 1) % presets.length]);
              }}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125"
              style={{
                background: C.cardSolid,
                borderColor: C.cardBorder,
                color: lightPreset === 'studio' ? C.cyan : lightPreset === 'warm' ? C.amber : '#66aaff',
              }}
              title={`Lighting: ${lightPreset}`}
            >
              <Sun className="w-3 h-3" />
            </button>
            <button
              onClick={() => setResetTrigger(p => p + 1)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-semibold transition-all border hover:brightness-125"
              style={{
                background: C.cardSolid,
                borderColor: C.cardBorder,
                color: C.muted,
              }}
              title="Reset camera"
            >
              ⟳
            </button>
          </div>
        </div>
      )}

      {/* Model list overlay for multi-model */}
      {isMultiModel && showModelList && (
        <div
          className="absolute top-12 left-3 z-20 rounded-xl overflow-hidden"
          style={{
            background: 'rgba(12,14,20,0.95)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${C.cardBorder}`,
            minWidth: 180,
            maxHeight: 'calc(100% - 60px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div className="px-3 py-2 flex items-center gap-2" style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
            <Eye className="w-3 h-3" style={{ color: C.cyan }} />
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.muted }}>
              Models ({models!.length})
            </span>
          </div>
          <div className="py-1 px-1.5 max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: `${C.gray} transparent` }}>
            {models!.map((model, idx) => {
              const catColor = model.colorOverride || CATEGORY_COLORS[model.category] || '#c0c0c0';
              const isActive = highlightedModelIndex === idx;
              return (
                <button
                  key={`${model.fjId}-${idx}`}
                  onClick={() => setHighlightedModelIndex(isActive ? null : idx)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-200 hover:brightness-110 mb-0.5"
                  style={{
                    background: isActive ? `${catColor}12` : 'transparent',
                    border: `1px solid ${isActive ? `${catColor}30` : 'transparent'}`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: catColor, opacity: isActive ? 1 : 0.5 }}
                  />
                  <span
                    className="text-[10px] font-medium truncate flex-1"
                    style={{ color: isActive ? catColor : C.text }}
                  >
                    {model.modelName}
                  </span>
                  {isActive && (
                    <Eye className="w-3 h-3 flex-shrink-0" style={{ color: catColor }} />
                  )}
                </button>
              );
            })}
          </div>
          <div className="px-3 py-1.5" style={{ borderTop: `1px solid ${C.cardBorder}` }}>
            <button
              onClick={() => setHighlightedModelIndex(null)}
              className="w-full text-center text-[9px] font-semibold py-1 rounded-md transition-all hover:brightness-110"
              style={{ background: `${C.cyan}10`, color: C.cyan, border: `1px solid ${C.cyan}20` }}
            >
              Show All
            </button>
          </div>
        </div>
      )}

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        style={{ background: 'linear-gradient(180deg, #0a0c14 0%, #111318 60%, #151821 100%)' }}
      >
        <CameraController resetTrigger={resetTrigger} isMultiModel={isMultiModel} controlsRef={controlsRef} />

        {/* Lighting */}
        <ambientLight intensity={lighting.ambient} />
        <directionalLight position={[5, 8, 5]} intensity={lighting.dir1} castShadow />
        <directionalLight position={[-3, 5, -5]} intensity={lighting.dir2} />
        <pointLight position={[0, 2, 3]} intensity={0.5} color={lighting.point1} />
        <pointLight position={[0, 1, -3]} intensity={0.3} color={lighting.point2} />
        <pointLight position={[0, 2, -2]} intensity={0.2} color="#4488ff" />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, isMultiModel ? -4 : -1.2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#111318" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Grid */}
        {showGrid && (
          <gridHelper args={[isMultiModel ? 16 : 6, isMultiModel ? 40 : 30, '#1a1e2b', '#151821']} position={[0, isMultiModel ? -3.99 : -1.19, 0]} />
        )}

        {/* Contact shadows */}
        <ContactShadows position={[0, isMultiModel ? -3.98 : -1.18, 0]} opacity={0.4} scale={isMultiModel ? 16 : 5} blur={2.5} far={4} />

        {/* Orbit controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={0.8}
          maxDistance={isMultiModel ? 20 : 10}
          target={[0, isMultiModel ? 0 : 0, 0]}
          autoRotate={autoRotate}
          autoRotateSpeed={1.2}
          enableDamping
          dampingFactor={0.08}
          makeDefault
        />

        {/* Single model or multi-model scene */}
        {isMultiModel ? (
          <MultiModelScene
            models={models!}
            wireframe={wireframe}
            highlightedIndex={highlightedModelIndex}
            onModelClick={(idx) => {
              setHighlightedModelIndex(prev => prev === idx ? null : idx);
            }}
          />
        ) : (
          <OBJModelScene
            fjId={fjId}
            category={category}
            modelName={modelName}
            wireframe={wireframe}
          />
        )}
      </Canvas>

      {/* Viewport overlay info */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
        <span className="px-2 py-1 rounded-md text-[9px] font-medium" style={{ background: 'rgba(0,0,0,0.6)', color: C.muted, backdropFilter: 'blur(8px)' }}>
          {isMultiModel
            ? 'Click models to highlight · Drag to rotate · Scroll to zoom'
            : 'Drag to rotate · Scroll to zoom · Right-click to pan'}
        </span>
        {lightPreset !== 'studio' && (
          <span className="px-2 py-1 rounded-md text-[9px] font-medium" style={{ background: 'rgba(0,0,0,0.6)', color: lightPreset === 'warm' ? C.amber : '#66aaff', backdropFilter: 'blur(8px)' }}>
            {lightPreset === 'warm' ? '☀️ Warm' : '❄️ Cool'} lighting
          </span>
        )}
      </div>
    </div>
  );
});

export default OBJModelViewerInner;
