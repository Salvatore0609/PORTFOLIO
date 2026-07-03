// src/types/meshopt_decoder.d.ts
interface Window {
  MeshoptDecoder?: {
    ready: Promise<void>;
    supported: boolean;
    decodeGltfBuffer(
      target: Uint8Array,
      count: number,
      size: number,
      source: Uint8Array,
      mode: string,
      filter?: string
    ): void;
  };
}