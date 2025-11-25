import { kyberEncryptSymmetricKey } from './kyberStub';
import { keccak256 } from 'viem';

export async function shardFile(file: File, chunkSize = 10 * 1024 * 1024) {
  const shards: Array<ArrayBuffer> = [];
  let offset = 0;
  while (offset < file.size) {
    const slice = file.slice(offset, offset + chunkSize);
    const ab = await slice.arrayBuffer();
    shards.push(ab);
    offset += chunkSize;
  }
  return shards;
}

async function generateAesKey() {
  return crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}

async function exportKeyRaw(key: CryptoKey) {
  return new Uint8Array(await crypto.subtle.exportKey('raw', key));
}

export async function encryptShard(shard: ArrayBuffer) {
  const key = await generateAesKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, shard);
  const rawKey = await exportKeyRaw(key);
  const encryptedKey = await kyberEncryptSymmetricKey(rawKey);
  return {
    encryptedData: new Uint8Array(cipher),
    iv: Array.from(iv),
    encryptedKey,
  };
}

export function arrayBufferToHex(buf: ArrayBuffer | Uint8Array) {
  const u8 = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  return '0x' + Array.from(u8).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function concatHex(hexes: string[]) {
  // remove 0x prefixes then concat
  return '0x' + hexes.map((h) => h.replace(/^0x/, '')).join('');
}

export function computeKeccakOfHex(hex: string) {
  // viem.keccak256 accepts a hex string
  return keccak256(hex);
}

export async function computeDatasetHashFromEncryptedShards(encryptedShards: Array<Uint8Array>) {
  const shardHexes = encryptedShards.map((s) => arrayBufferToHex(s));
  const concatenated = concatHex(shardHexes);
  return computeKeccakOfHex(concatenated);
}
