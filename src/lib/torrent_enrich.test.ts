import { enrichTorrent } from "./torrent_enrich.js";
import test from "ava";
import fs from "fs/promises";

test("can parse torrent", async (t) => {
  const file = await fs.readFile("assets/test/[acgrip]305706.torrent");
  const torrent = await enrichTorrent(file);
  t.is(torrent.info_hash, "7e5763d43fc939d0eb5a8f37a6acd9ce0607b551");
  t.is(torrent.info_hash_normalized, "7e5763d43fc939d0eb5a8f37a6acd9ce0607b551");
  t.is(torrent.files.length, 206);
  t.is(
    torrent.files[0]?.path,
    "[Airota&Nekomoe kissaten&VCB-Studio] Machikado Mazoku [Ma10p_1080p]/[Airota&Nekomoe kissaten&VCB-Studio] Machikado Mazoku [01][Ma10p_1080p][x265_flac].mkv",
  );
  t.is(torrent.files[0]?.size, 598371551);
});

test("can normalize info_hash", async (t) => {
  const file = await fs.readFile("assets/test/[TJUPT]426623.torrent");
  const torrent = await enrichTorrent(file);
  t.is(torrent.info_hash, "faf8a3aa7d51df5f48a8177ed80b7c60e541efbb");
  t.is(torrent.info_hash_normalized, "7e5763d43fc939d0eb5a8f37a6acd9ce0607b551");
  t.is(torrent.files.length, 206);
  t.is(
    torrent.files[0]?.path,
    "[Airota&Nekomoe kissaten&VCB-Studio] Machikado Mazoku [Ma10p_1080p]/[Airota&Nekomoe kissaten&VCB-Studio] Machikado Mazoku [01][Ma10p_1080p][x265_flac].mkv",
  );
  t.is(torrent.files[0]?.size, 598371551);
});

test("can parse single-file torrent", async (t) => {
  const file = await fs.readFile("assets/test/[acgrip]305802.torrent");
  const torrent = await enrichTorrent(file);
  t.is(torrent.info_hash, "4c94431cc2f8b579e0a1881dbb448f84ad231e2f");
  t.is(torrent.info_hash_normalized, "4c94431cc2f8b579e0a1881dbb448f84ad231e2f");
  t.is(torrent.files.length, 1);
  t.deepEqual(torrent.files[0], {
    path: "[Nekomoe kissaten&LoliHouse] GIRLS BAND CRY - 10 [WebRip 1080p HEVC-10bit AAC ASSx2].mkv",
    size: 533296655,
  });
});

test("can parse single-file torrent and normalize", async (t) => {
  const file = await fs.readFile("assets/test/[TJUPT]426827.torrent");
  const torrent = await enrichTorrent(file);
  t.is(torrent.info_hash, "eeb0e2978f65e87bf26823ae706122134aacaec5");
  t.is(torrent.info_hash_normalized, "4c94431cc2f8b579e0a1881dbb448f84ad231e2f");
  t.is(torrent.files.length, 1);
  t.deepEqual(torrent.files[0], {
    path: "[Nekomoe kissaten&LoliHouse] GIRLS BAND CRY - 10 [WebRip 1080p HEVC-10bit AAC ASSx2].mkv",
    size: 533296655,
  });
});
