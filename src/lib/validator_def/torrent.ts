import {
  MultipleFileTorrent,
  SingleFileTorrent,
  TorrentFileV1,
  TorrentFileV2,
  TorrentFileV2FileTree,
} from "../torrent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import typia, { createIs, createValidate } from "typia";
import { createPrune } from "typia/lib/misc.js";

export const isMultipleFileTorrent = createIs<MultipleFileTorrent>();
export const isSingleFileTorrent = createIs<SingleFileTorrent>();
export const isTorrentFileV1 = createIs<TorrentFileV1>();
export const isTorrentFileV2FileTree = createIs<TorrentFileV2FileTree>();
export const isTorrentFileV2 = createIs<TorrentFileV2>();

export const validateMultipleFileTorrent = createValidate<MultipleFileTorrent>();
export const validateSingleFileTorrent = createValidate<SingleFileTorrent>();
export const validateTorrentFileV1 = createValidate<TorrentFileV1>();
export const validateTorrentFileV2FileTree = createValidate<TorrentFileV2FileTree>();
export const validateTorrentFileV2 = createValidate<TorrentFileV2>();

export const pruneMultipleFileTorrent = createPrune<MultipleFileTorrent>();
export const pruneSingleFileTorrent = createPrune<SingleFileTorrent>();
export const pruneTorrentFileV1 = createPrune<TorrentFileV1>();
export const pruneTorrentFileV2FileTree = createPrune<TorrentFileV2FileTree>();
export const pruneTorrentFileV2 = createPrune<TorrentFileV2>();
