// meshopt_decoder_module.js
import './meshopt_decoder.js';

// Il decoder è ora disponibile globalmente
const globalDecoder = (typeof self !== 'undefined' ? self : window).MeshoptDecoder;

export const MeshoptDecoder = {
  ready: globalDecoder.ready,
  supported: globalDecoder.supported,
  decodeGltfBuffer: (...args) => globalDecoder.decodeGltfBuffer(...args),
  decodeGltfBufferAsync: (...args) => globalDecoder.decodeGltfBufferAsync(...args),
};