import { USER_AGENT } from "../source/index.js";
import { TorrentV1 } from "./torrent.js";
import bencode from "bencode";
import ky from "ky";

export interface Torrent {
  info_hash: string;
  info_hash_normalized: string;
  files: { path: string; size: number }[];
}

const sha1 = async (t: Buffer): Promise<Uint8Array> => {
  const ab = await crypto.subtle.digest("SHA-1", t);
  return new Uint8Array(ab);
};

const arrayBufferToHexString = (a: Uint8Array): string => {
  return [...new Uint8Array(a)].map((x): string => x.toString(16).padStart(2, "0")).join("");
};

const arr2text = (a: Uint8Array): string => new TextDecoder().decode(a);

export const enrichTorrent = async (content: Uint8Array): Promise<Torrent> => {
  const rawTorrent = (await bencode.decode(Buffer.from(content))) as unknown;
  const { data: torrent, error } = TorrentV1.safeParse(rawTorrent);
  if (!torrent) {
    throw new Error("invalid torrent: " + JSON.stringify(error), { cause: error });
  }

  const hash = await sha1(bencode.encode((rawTorrent as TorrentV1).info));
  const hashNorm = await sha1(
    bencode.encode({
      "name": torrent.info.name,
      "piece length": torrent.info["piece length"],
      "pieces": torrent.info.pieces,
      "files": "files" in torrent.info ? torrent.info.files?.map((f) => ({ length: f.length, path: f.path })) : null,
      "length": "length" in torrent.info ? torrent.info.length : null,
    }),
  );

  const files: Torrent["files"] = [];
  if (!("files" in torrent.info)) {
    files.push({ path: arr2text(torrent.info.name), size: torrent.info.length });
  } else {
    for (const file of torrent.info.files ?? []) {
      files.push({
        path: arr2text(torrent.info.name) + "/" + file.path.map((seg) => arr2text(seg)).join("/"),
        size: file.length,
      });
    }
  }

  return {
    info_hash: arrayBufferToHexString(hash),
    info_hash_normalized: arrayBufferToHexString(hashNorm),
    files,
  };
};

export const enrichTorrentRemote = async (url: string): Promise<Torrent> => {
  const data = await ky
    .get(url, {
      headers: { "User-Agent": USER_AGENT },
    })
    .arrayBuffer();
  return enrichTorrent(new Uint8Array(data));
};
