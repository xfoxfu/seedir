export interface MultipleFileTorrent {
  /**
   * The files list is the value `files` maps to, and is a list of dictionaries.
   */
  files: {
    /** The length of the file, in bytes. */
    length: number;
    /**
     * A list of UTF-8 encoded strings corresponding to subdirectory names, the
     * last of which is the actual file name (a zero length list is an error
     * case).
     */
    path: Uint8Array[];
  }[];
  length: undefined;
}

export interface SingleFileTorrent {
  /** The download represents a single file. It represents a single file. */
  length: number;
  files: undefined;
}

export interface TorrentFileV1 {
  /**
   * The URL of the tracker.
   *
   * Optional for compatiblity with some trackers.
   */
  "announce"?: Uint8Array;
  /** This maps to a dictionary, with keys described below. */
  "info": (MultipleFileTorrent | SingleFileTorrent) & {
    /**
     * A UTF-8 encoded string which is the suggested name to save the file (or
     * directory) as. It is purely advisory.
     *
     * In the single file case, the name key is the name of a file, in the
     * muliple file case, it's the name of a directory.
     */
    "name": Uint8Array;
    /**
     * The number of bytes in each piece the file is split into.
     * For the purposes of transfer, files are split into fixed-size pieces
     * which are all the same length except for possibly the last one which
     * may be truncated.
     *
     * It is almost always a power of two, most commonly 2^18 = 256 K
     * (BitTorrent prior to version 3.2 uses 2^20 = 1 M as default).
     */
    "piece length": number;
    /**
     * a hash list, i.e., a concatenation of each piece's SHA-1 hash. As SHA-1
     * returns a 160-bit hash, pieces will be a string whose length is a multiple
     * of 20 bytes. If the torrent contains multiple files, the pieces are formed
     * by concatenating the files in the order they appear in the files dictionary
     * (i.e., all pieces in the torrent are the full piece length except for the
     * last piece, which may be shorter).
     */
    "pieces": Uint8Array;
    /**
     * When generating a metainfo file, users denote a torrent as private by
     * including the key-value pair "private=1" in the "info" dict of the
     * torrent's metainfo file.
     *
     * `0` is for compatibility with some trackers.
     *
     * @see BEP-0027
     */
    "private"?: 1 | 0;
  };
  /**
   * A trackerless torrent dictionary does not have an "announce" key. Instead,
   * a trackerless torrent has a "nodes" key. This key should be set to the K
   * closest nodes in the torrent generating client's routing table.
   * Alternatively, the key could be set to a known good node such as one
   * operated by the person generating the torrent. Please do not automatically
   * add "router.bittorrent.com" to torrent files or automatically add this node
   * to clients routing tables.
   *
   * ```
   * nodes = [["<host>", <port>], ["<host>", <port>], ...]
   * ```
   *
   * @see BEP-0005
   */
  "nodes"?: [Uint8Array, number][];
  /**
   * In addition to the standard "announce" key, in the main area of the
   * metadata file and not part of the "info" section, will be a new key,
   * "announce-list". This key will refer to a list of lists of URLs, and will
   * contain a list of tiers of announces. If the client is compatible with the
   * multitracker specification, and if the "announce-list" key is present, the
   * client will ignore the "announce" key and only use the URLs in
   * "announce-list".
   *
   * @see BEP-0012
   */
  "announce-list"?: Uint8Array[][];
  /**
   * In the main area of the metadata file and not part of the "info" section,
   * will be a new key, "url-list". This key will refer to a one or more URLs,
   * and will contain a list of web addresses where torrent data can be
   * retrieved. This key may be safely ignored if the client is not capable of
   * using it.
   *
   * If the "url-list" URL ends in a slash, "/" the client must add the "name"
   * from the torrent to make the full URL. This allows .torrent generators to
   * treat this field same for single file and multi-file torrents.
   *
   * @see BEP-0019
   */
  "url-list"?: Uint8Array[];
}

export interface TorrentFileV2FileTree {
  [P: string]:
    | {
        /**
         * Length of the file in bytes. Presence of this field indicates that
         * the dictionary describes a file, not a directory. Which means it must
         * not have any sibling entries.
         */
        "length": number;
        /**
         * For non-empty files this is the the root hash of a merkle tree with a
         * branching factor of 2, constructed from 16KiB blocks of the file. The
         * last block may be shorter than 16KiB. The remaining leaf hashes
         * beyond the end of the file required to construct upper layers of the
         * merkle tree are set to zero. As of `meta version` 2 SHA2-256 is used
         * as digest function for the merkle tree. The hash is stored in its
         * binary form, not as human-readable string.
         *
         * Note that identical files always result in the same root hash.
         */
        "pieces root": Uint8Array;
      }
    | TorrentFileV2FileTree;
}

export interface TorrentFileV2 {
  /** The URL of the tracker. */
  "announce": Uint8Array;
  /** This maps to a dictionary, with keys described below. */
  "info": {
    /** A display name for the torrent. It is purely advisory. */
    "name": Uint8Array;
    /**
     * The number of bytes that each logical piece in the peer protocol refers
     * to. I.e. it sets the granularity of `piece`, `request`, `bitfield` and
     * `have` messages. It must be a power of two and at least 16KiB.
     *
     * Files are mapped into this piece address space so that each non-empty
     * file is aligned to a piece boundary and occurs in the same order as in
     * the file tree. The last piece of each file may be shorter than the
     * specified piece length, resulting in an alignment gap.
     */
    "piece length": number;
    /**
     * An integer value, set to 2 to indicate compatibility with the current
     * revision of this specification. Version 1 is not assigned to avoid
     * confusion with BEP3. Future revisions will only increment this value to
     * indicate an incompatible change has been made, for example that hash
     * algorithms were changed due to newly discovered vulnerabilities.
     * Implementations must check this field first and indicate that a torrent
     * is of a newer version than they can handle before performing other
     * validations which may result in more general messages about invalid
     * files.
     */
    "meta version": 2;
    /**
     * A tree of dictionaries where dictionary keys represent UTF-8 encoded path
     * elements. Entries with zero-length keys describe the properties of the
     * composed path at that point. 'UTF-8 encoded' in this context only means
     * that if the native encoding is known at creation time it must be
     * converted to UTF-8. Keys may contain invalid UTF-8 sequences or
     * characters and names that are reserved on specific filesystems.
     * Implementations must be prepared to sanitize them. On most platforms path
     * components exactly matching '.' and '..' must be sanitized since they
     * could lead to directory traversal attacks and conflicting path
     * descriptions. On platforms that require valid UTF-8 path components this
     * sanitizing step must happen after normalizing overlong UTF-8 encodings.
     *
     * The `file tree` root dictionary itself must not be a file, i.e. it must
     * not contain a zero-length key with a dictionary containing a `length` key.
     *
     * ## Example
     *
     * ```json
     * {
     *   info: {
     *     file tree: {
     *       dir1: {
     *         dir2: {
     *           fileA.txt: {
     *             "": {
     *               length: <length of file in bytes (integer)>,
     *               pieces root: <optional, merkle tree root (string)>,
     *               ...
     *             }
     *           },
     *           fileB.txt: {
     *             "": {
     *               ...
     *             }
     *           }
     *         },
     *         dir3: {
     *           ...
     *         }
     *       }
     *     }
     *   }
     * }
     * ```
     *
     * ## Paths
     *
     * - file tree: `{name.ext: {"": {length: ...}}}`
     *
     *   a single-file torrent
     *
     * - file tree: `{nameA.ext: {"": {length: ...}}, nameB.ext: {"": {length: ...}}, dir: {...}}`
     *
     *   a rootless multifile torrent, i.e. a list of files and directories
     *   without a named common directory containing them. implementations may
     *   offer users to optionally prepend the torrent name as root to avoid
     *   file name collisions.
     *
     * - file tree: `{dir: {nameA.ext: {"": {length: ...}}, nameB.ext: {"": {length: ...}}}}`
     *
     *   multiple files rooted in a single directory
     */
    "file tree": TorrentFileV2FileTree;
  };
  /**
   * A dictionary of strings. For each file in the file tree that is larger than
   * the piece size it contains one string value. The keys are the merkle roots
   * while the values consist of concatenated hashes of one layer within that
   * merkle tree. The layer is chosen so that one hash covers piece `length bytes`.
   * For example if the piece size is 16KiB then the leaf hashes are used. If a
   * piece size of 128KiB is used then 3rd layer up from the leaf hashes is used.
   * Layer hashes which exclusively cover data beyond the end of file, i.e. are
   * only needed to balance the tree, are omitted. All hashes are stored in their
   * binary format.
   *
   * A torrent is not valid if this field is absent, the contained hashes do not
   * match the merkle roots or are not from the correct layer.
   */
  "piece layers": unknown;
}
