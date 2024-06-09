import { MultipleFileTorrent, SingleFileTorrent, TorrentFileV1, TorrentFileV2, TorrentFileV2FileTree, } from "../torrent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import typia, { createIs, createValidate } from "typia";
import { createPrune } from "typia/lib/misc.js";
export const isMultipleFileTorrent = (input: any): input is MultipleFileTorrent => {
    const $io0 = (input: any): boolean => Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem)) && (null !== input.length && undefined === input.length);
    const $io1 = (input: any): boolean => "number" === typeof input.length && (Array.isArray(input.path) && input.path.every((elem: any) => elem instanceof Uint8Array));
    return "object" === typeof input && null !== input && $io0(input);
};
export const isSingleFileTorrent = (input: any): input is SingleFileTorrent => {
    const $io0 = (input: any): boolean => "number" === typeof input.length && (null !== input.files && undefined === input.files);
    return "object" === typeof input && null !== input && $io0(input);
};
export const isTorrentFileV1 = (input: any): input is TorrentFileV1 => {
    const $io0 = (input: any): boolean => (undefined === input.announce || input.announce instanceof Uint8Array) && ("object" === typeof input.info && null !== input.info && $iu0(input.info)) && (undefined === input.nodes || Array.isArray(input.nodes) && input.nodes.every((elem: any) => Array.isArray(elem) && (elem.length === 2 && elem[0] instanceof Uint8Array && "number" === typeof elem[1]))) && (undefined === input["announce-list"] || Array.isArray(input["announce-list"]) && input["announce-list"].every((elem: any) => Array.isArray(elem) && elem.every((elem: any) => elem instanceof Uint8Array))) && (undefined === input["url-list"] || Array.isArray(input["url-list"]) && input["url-list"].every((elem: any) => elem instanceof Uint8Array));
    const $io1 = (input: any): boolean => Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)) && (null !== input.length && undefined === input.length) && input.name instanceof Uint8Array && "number" === typeof input["piece length"] && input.pieces instanceof Uint8Array && (undefined === input.private || 0 === input.private || 1 === input.private);
    const $io2 = (input: any): boolean => "number" === typeof input.length && (Array.isArray(input.path) && input.path.every((elem: any) => elem instanceof Uint8Array));
    const $io3 = (input: any): boolean => "number" === typeof input.length && (null !== input.files && undefined === input.files) && input.name instanceof Uint8Array && "number" === typeof input["piece length"] && input.pieces instanceof Uint8Array && (undefined === input.private || 0 === input.private || 1 === input.private);
    const $iu0 = (input: any): any => (() => {
        if ("number" === typeof input.length)
            return $io3(input);
        else if (Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)))
            return $io1(input);
        else
            return false;
    })();
    return "object" === typeof input && null !== input && $io0(input);
};
export const isTorrentFileV2FileTree = (input: any): input is TorrentFileV2FileTree => {
    const $io0 = (input: any): boolean => Object.keys(input).every((key: any) => {
        const value = input[key];
        if (undefined === value)
            return true;
        return "object" === typeof value && null !== value && false === Array.isArray(value) && $iu0(value);
    });
    const $io1 = (input: any): boolean => "number" === typeof input.length && input["pieces root"] instanceof Uint8Array;
    const $iu0 = (input: any): any => (() => {
        if (undefined !== input.length)
            return $io1(input);
        else
            return $io0(input);
    })();
    return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
};
export const isTorrentFileV2 = (input: any): input is TorrentFileV2 => {
    const $io0 = (input: any): boolean => input.announce instanceof Uint8Array && ("object" === typeof input.info && null !== input.info && $io1(input.info)) && true;
    const $io1 = (input: any): boolean => input.name instanceof Uint8Array && "number" === typeof input["piece length"] && 2 === input["meta version"] && ("object" === typeof input["file tree"] && null !== input["file tree"] && false === Array.isArray(input["file tree"]) && $io2(input["file tree"]));
    const $io2 = (input: any): boolean => Object.keys(input).every((key: any) => {
        const value = input[key];
        if (undefined === value)
            return true;
        return "object" === typeof value && null !== value && false === Array.isArray(value) && $iu0(value);
    });
    const $io3 = (input: any): boolean => "number" === typeof input.length && input["pieces root"] instanceof Uint8Array;
    const $iu0 = (input: any): any => (() => {
        if (undefined !== input.length)
            return $io3(input);
        else
            return $io2(input);
    })();
    return "object" === typeof input && null !== input && $io0(input);
};
export const validateMultipleFileTorrent = (input: any): typia.IValidation<MultipleFileTorrent> => {
    const errors = [] as any[];
    const __is = (input: any): input is MultipleFileTorrent => {
        const $io0 = (input: any): boolean => Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem)) && (null !== input.length && undefined === input.length);
        const $io1 = (input: any): boolean => "number" === typeof input.length && (Array.isArray(input.path) && input.path.every((elem: any) => elem instanceof Uint8Array));
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input)) {
        const $report = (createValidate as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is MultipleFileTorrent => {
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(Array.isArray(input.files) || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "Array<__type>",
                    value: input.files
                })) && input.files.map((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".files[" + _index1 + "]",
                    expected: "__type",
                    value: elem
                })) && $vo1(elem, _path + ".files[" + _index1 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".files[" + _index1 + "]",
                    expected: "__type",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "Array<__type>",
                    value: input.files
                }), (null !== input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "undefined",
                    value: input.length
                })) && (undefined === input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "undefined",
                    value: input.length
                }))].every((flag: boolean) => flag);
            const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["number" === typeof input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "number",
                    value: input.length
                }), (Array.isArray(input.path) || $report(_exceptionable, {
                    path: _path + ".path",
                    expected: "Array<Uint8Array>",
                    value: input.path
                })) && input.path.map((elem: any, _index2: number) => elem instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".path[" + _index2 + "]",
                    expected: "Uint8Array",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".path",
                    expected: "Array<Uint8Array>",
                    value: input.path
                })].every((flag: boolean) => flag);
            return ("object" === typeof input && null !== input || $report(true, {
                path: _path + "",
                expected: "MultipleFileTorrent",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "MultipleFileTorrent",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
export const validateSingleFileTorrent = (input: any): typia.IValidation<SingleFileTorrent> => {
    const errors = [] as any[];
    const __is = (input: any): input is SingleFileTorrent => {
        const $io0 = (input: any): boolean => "number" === typeof input.length && (null !== input.files && undefined === input.files);
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input)) {
        const $report = (createValidate as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is SingleFileTorrent => {
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["number" === typeof input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "number",
                    value: input.length
                }), (null !== input.files || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "undefined",
                    value: input.files
                })) && (undefined === input.files || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "undefined",
                    value: input.files
                }))].every((flag: boolean) => flag);
            return ("object" === typeof input && null !== input || $report(true, {
                path: _path + "",
                expected: "SingleFileTorrent",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "SingleFileTorrent",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
export const validateTorrentFileV1 = (input: any): typia.IValidation<TorrentFileV1> => {
    const errors = [] as any[];
    const __is = (input: any): input is TorrentFileV1 => {
        const $io0 = (input: any): boolean => (undefined === input.announce || input.announce instanceof Uint8Array) && ("object" === typeof input.info && null !== input.info && $iu0(input.info)) && (undefined === input.nodes || Array.isArray(input.nodes) && input.nodes.every((elem: any) => Array.isArray(elem) && (elem.length === 2 && elem[0] instanceof Uint8Array && "number" === typeof elem[1]))) && (undefined === input["announce-list"] || Array.isArray(input["announce-list"]) && input["announce-list"].every((elem: any) => Array.isArray(elem) && elem.every((elem: any) => elem instanceof Uint8Array))) && (undefined === input["url-list"] || Array.isArray(input["url-list"]) && input["url-list"].every((elem: any) => elem instanceof Uint8Array));
        const $io1 = (input: any): boolean => Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)) && (null !== input.length && undefined === input.length) && input.name instanceof Uint8Array && "number" === typeof input["piece length"] && input.pieces instanceof Uint8Array && (undefined === input.private || 0 === input.private || 1 === input.private);
        const $io2 = (input: any): boolean => "number" === typeof input.length && (Array.isArray(input.path) && input.path.every((elem: any) => elem instanceof Uint8Array));
        const $io3 = (input: any): boolean => "number" === typeof input.length && (null !== input.files && undefined === input.files) && input.name instanceof Uint8Array && "number" === typeof input["piece length"] && input.pieces instanceof Uint8Array && (undefined === input.private || 0 === input.private || 1 === input.private);
        const $iu0 = (input: any): any => (() => {
            if ("number" === typeof input.length)
                return $io3(input);
            else if (Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)))
                return $io1(input);
            else
                return false;
        })();
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input)) {
        const $report = (createValidate as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is TorrentFileV1 => {
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.announce || input.announce instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".announce",
                    expected: "(Uint8Array | undefined)",
                    value: input.announce
                }), ("object" === typeof input.info && null !== input.info || $report(_exceptionable, {
                    path: _path + ".info",
                    expected: "(MultipleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; } | SingleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; })",
                    value: input.info
                })) && $vu0(input.info, _path + ".info", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".info",
                    expected: "(MultipleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; } | SingleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; })",
                    value: input.info
                }), undefined === input.nodes || (Array.isArray(input.nodes) || $report(_exceptionable, {
                    path: _path + ".nodes",
                    expected: "(Array<[Uint8Array, number]> | undefined)",
                    value: input.nodes
                })) && input.nodes.map((elem: any, _index1: number) => (Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".nodes[" + _index1 + "]",
                    expected: "[Uint8Array, number]",
                    value: elem
                })) && ((elem.length === 2 || $report(_exceptionable, {
                    path: _path + ".nodes[" + _index1 + "]",
                    expected: "[Uint8Array, number]",
                    value: elem
                })) && [
                    elem[0] instanceof Uint8Array || $report(_exceptionable, {
                        path: _path + ".nodes[" + _index1 + "][0]",
                        expected: "Uint8Array",
                        value: elem[0]
                    }),
                    "number" === typeof elem[1] || $report(_exceptionable, {
                        path: _path + ".nodes[" + _index1 + "][1]",
                        expected: "number",
                        value: elem[1]
                    })
                ].every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".nodes[" + _index1 + "]",
                    expected: "[Uint8Array, number]",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".nodes",
                    expected: "(Array<[Uint8Array, number]> | undefined)",
                    value: input.nodes
                }), undefined === input["announce-list"] || (Array.isArray(input["announce-list"]) || $report(_exceptionable, {
                    path: _path + "[\"announce-list\"]",
                    expected: "(Array<Array<Uint8Array>> | undefined)",
                    value: input["announce-list"]
                })) && input["announce-list"].map((elem: any, _index2: number) => (Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + "[\"announce-list\"][" + _index2 + "]",
                    expected: "Array<Uint8Array>",
                    value: elem
                })) && elem.map((elem: any, _index3: number) => elem instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + "[\"announce-list\"][" + _index2 + "][" + _index3 + "]",
                    expected: "Uint8Array",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + "[\"announce-list\"][" + _index2 + "]",
                    expected: "Array<Uint8Array>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + "[\"announce-list\"]",
                    expected: "(Array<Array<Uint8Array>> | undefined)",
                    value: input["announce-list"]
                }), undefined === input["url-list"] || (Array.isArray(input["url-list"]) || $report(_exceptionable, {
                    path: _path + "[\"url-list\"]",
                    expected: "(Array<Uint8Array> | undefined)",
                    value: input["url-list"]
                })) && input["url-list"].map((elem: any, _index4: number) => elem instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + "[\"url-list\"][" + _index4 + "]",
                    expected: "Uint8Array",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + "[\"url-list\"]",
                    expected: "(Array<Uint8Array> | undefined)",
                    value: input["url-list"]
                })].every((flag: boolean) => flag);
            const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(Array.isArray(input.files) || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "Array<__type>",
                    value: input.files
                })) && input.files.map((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".files[" + _index5 + "]",
                    expected: "__type",
                    value: elem
                })) && $vo2(elem, _path + ".files[" + _index5 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".files[" + _index5 + "]",
                    expected: "__type",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "Array<__type>",
                    value: input.files
                }), (null !== input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "undefined",
                    value: input.length
                })) && (undefined === input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "undefined",
                    value: input.length
                })), input.name instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "Uint8Array",
                    value: input.name
                }), "number" === typeof input["piece length"] || $report(_exceptionable, {
                    path: _path + "[\"piece length\"]",
                    expected: "number",
                    value: input["piece length"]
                }), input.pieces instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".pieces",
                    expected: "Uint8Array",
                    value: input.pieces
                }), undefined === input.private || 0 === input.private || 1 === input.private || $report(_exceptionable, {
                    path: _path + ".private",
                    expected: "(0 | 1 | undefined)",
                    value: input.private
                })].every((flag: boolean) => flag);
            const $vo2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["number" === typeof input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "number",
                    value: input.length
                }), (Array.isArray(input.path) || $report(_exceptionable, {
                    path: _path + ".path",
                    expected: "Array<Uint8Array>",
                    value: input.path
                })) && input.path.map((elem: any, _index6: number) => elem instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".path[" + _index6 + "]",
                    expected: "Uint8Array",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".path",
                    expected: "Array<Uint8Array>",
                    value: input.path
                })].every((flag: boolean) => flag);
            const $vo3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["number" === typeof input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "number",
                    value: input.length
                }), (null !== input.files || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "undefined",
                    value: input.files
                })) && (undefined === input.files || $report(_exceptionable, {
                    path: _path + ".files",
                    expected: "undefined",
                    value: input.files
                })), input.name instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "Uint8Array",
                    value: input.name
                }), "number" === typeof input["piece length"] || $report(_exceptionable, {
                    path: _path + "[\"piece length\"]",
                    expected: "number",
                    value: input["piece length"]
                }), input.pieces instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".pieces",
                    expected: "Uint8Array",
                    value: input.pieces
                }), undefined === input.private || 0 === input.private || 1 === input.private || $report(_exceptionable, {
                    path: _path + ".private",
                    expected: "(0 | 1 | undefined)",
                    value: input.private
                })].every((flag: boolean) => flag);
            const $vu0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if ("number" === typeof input.length)
                    return $vo3(input, _path, true && _exceptionable);
                else if (Array.isArray(input.files) && input.files.map((elem: any, _index7: number) => "object" === typeof elem && null !== elem && $vo2(elem, _path + ".files[" + _index7 + "]", false && _exceptionable)).every((flag: boolean) => flag))
                    return $vo1(input, _path, true && _exceptionable);
                else
                    return $report(_exceptionable, {
                        path: _path,
                        expected: "(SingleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; } | MultipleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; })",
                        value: input
                    });
            })();
            return ("object" === typeof input && null !== input || $report(true, {
                path: _path + "",
                expected: "TorrentFileV1",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "TorrentFileV1",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
export const validateTorrentFileV2FileTree = (input: any): typia.IValidation<TorrentFileV2FileTree> => {
    const errors = [] as any[];
    const __is = (input: any): input is TorrentFileV2FileTree => {
        const $io0 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            return "object" === typeof value && null !== value && false === Array.isArray(value) && $iu0(value);
        });
        const $io1 = (input: any): boolean => "number" === typeof input.length && input["pieces root"] instanceof Uint8Array;
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.length)
                return $io1(input);
            else
                return $io0(input);
        })();
        return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
    };
    if (false === __is(input)) {
        const $report = (createValidate as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is TorrentFileV2FileTree => {
            const $join = (createValidate as any).join;
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return ("object" === typeof value && null !== value && false === Array.isArray(value) || $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "(TorrentFileV2FileTree | __type)",
                        value: value
                    })) && $vu0(value, _path + $join(key), true && _exceptionable) || $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "(TorrentFileV2FileTree | __type)",
                        value: value
                    });
                }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
            const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["number" === typeof input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "number",
                    value: input.length
                }), input["pieces root"] instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + "[\"pieces root\"]",
                    expected: "Uint8Array",
                    value: input["pieces root"]
                })].every((flag: boolean) => flag);
            const $vu0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.length)
                    return $vo1(input, _path, true && _exceptionable);
                else
                    return $vo0(input, _path, true && _exceptionable);
            })();
            return ("object" === typeof input && null !== input && false === Array.isArray(input) || $report(true, {
                path: _path + "",
                expected: "TorrentFileV2FileTree",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "TorrentFileV2FileTree",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
export const validateTorrentFileV2 = (input: any): typia.IValidation<TorrentFileV2> => {
    const errors = [] as any[];
    const __is = (input: any): input is TorrentFileV2 => {
        const $io0 = (input: any): boolean => input.announce instanceof Uint8Array && ("object" === typeof input.info && null !== input.info && $io1(input.info)) && true;
        const $io1 = (input: any): boolean => input.name instanceof Uint8Array && "number" === typeof input["piece length"] && 2 === input["meta version"] && ("object" === typeof input["file tree"] && null !== input["file tree"] && false === Array.isArray(input["file tree"]) && $io2(input["file tree"]));
        const $io2 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            return "object" === typeof value && null !== value && false === Array.isArray(value) && $iu0(value);
        });
        const $io3 = (input: any): boolean => "number" === typeof input.length && input["pieces root"] instanceof Uint8Array;
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.length)
                return $io3(input);
            else
                return $io2(input);
        })();
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input)) {
        const $report = (createValidate as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is TorrentFileV2 => {
            const $join = (createValidate as any).join;
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [input.announce instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".announce",
                    expected: "Uint8Array",
                    value: input.announce
                }), ("object" === typeof input.info && null !== input.info || $report(_exceptionable, {
                    path: _path + ".info",
                    expected: "__type",
                    value: input.info
                })) && $vo1(input.info, _path + ".info", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".info",
                    expected: "__type",
                    value: input.info
                }), true].every((flag: boolean) => flag);
            const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [input.name instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "Uint8Array",
                    value: input.name
                }), "number" === typeof input["piece length"] || $report(_exceptionable, {
                    path: _path + "[\"piece length\"]",
                    expected: "number",
                    value: input["piece length"]
                }), 2 === input["meta version"] || $report(_exceptionable, {
                    path: _path + "[\"meta version\"]",
                    expected: "2",
                    value: input["meta version"]
                }), ("object" === typeof input["file tree"] && null !== input["file tree"] && false === Array.isArray(input["file tree"]) || $report(_exceptionable, {
                    path: _path + "[\"file tree\"]",
                    expected: "TorrentFileV2FileTree",
                    value: input["file tree"]
                })) && $vo2(input["file tree"], _path + "[\"file tree\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"file tree\"]",
                    expected: "TorrentFileV2FileTree",
                    value: input["file tree"]
                })].every((flag: boolean) => flag);
            const $vo2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return ("object" === typeof value && null !== value && false === Array.isArray(value) || $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "(TorrentFileV2FileTree | __type.o1)",
                        value: value
                    })) && $vu0(value, _path + $join(key), true && _exceptionable) || $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "(TorrentFileV2FileTree | __type.o1)",
                        value: value
                    });
                }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
            const $vo3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["number" === typeof input.length || $report(_exceptionable, {
                    path: _path + ".length",
                    expected: "number",
                    value: input.length
                }), input["pieces root"] instanceof Uint8Array || $report(_exceptionable, {
                    path: _path + "[\"pieces root\"]",
                    expected: "Uint8Array",
                    value: input["pieces root"]
                })].every((flag: boolean) => flag);
            const $vu0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.length)
                    return $vo3(input, _path, true && _exceptionable);
                else
                    return $vo2(input, _path, true && _exceptionable);
            })();
            return ("object" === typeof input && null !== input || $report(true, {
                path: _path + "",
                expected: "TorrentFileV2",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "TorrentFileV2",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
export const pruneMultipleFileTorrent = (input: MultipleFileTorrent): void => {
    const $io1 = (input: any): boolean => "number" === typeof input.length && (Array.isArray(input.path) && input.path.every((elem: any) => elem instanceof Uint8Array));
    const $pp0 = (input: any) => input.forEach((elem: any) => {
        if ("object" === typeof elem && null !== elem)
            $po1(elem);
    });
    const $po0 = (input: any): any => {
        if (Array.isArray(input.files))
            $pp0(input.files);
        for (const key of Object.keys(input)) {
            if ("files" === key || "length" === key)
                continue;
            delete input[key];
        }
    };
    const $po1 = (input: any): any => {
        for (const key of Object.keys(input)) {
            if ("length" === key || "path" === key)
                continue;
            delete input[key];
        }
    };
    if ("object" === typeof input && null !== input)
        $po0(input);
};
export const pruneSingleFileTorrent = (input: SingleFileTorrent): void => {
    const $po0 = (input: any): any => {
        for (const key of Object.keys(input)) {
            if ("length" === key || "files" === key)
                continue;
            delete input[key];
        }
    };
    if ("object" === typeof input && null !== input)
        $po0(input);
};
export const pruneTorrentFileV1 = (input: TorrentFileV1): void => {
    const $io1 = (input: any): boolean => Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)) && (null !== input.length && undefined === input.length) && input.name instanceof Uint8Array && "number" === typeof input["piece length"] && input.pieces instanceof Uint8Array && (undefined === input.private || 0 === input.private || 1 === input.private);
    const $io2 = (input: any): boolean => "number" === typeof input.length && (Array.isArray(input.path) && input.path.every((elem: any) => elem instanceof Uint8Array));
    const $io3 = (input: any): boolean => "number" === typeof input.length && (null !== input.files && undefined === input.files) && input.name instanceof Uint8Array && "number" === typeof input["piece length"] && input.pieces instanceof Uint8Array && (undefined === input.private || 0 === input.private || 1 === input.private);
    const $iu0 = (input: any): any => (() => {
        if ("number" === typeof input.length)
            return $io3(input);
        else if (Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)))
            return $io1(input);
        else
            return false;
    })();
    const $throws = (createPrune as any).throws;
    const $pp0 = (input: any) => input.forEach((elem: any) => {
        if ("object" === typeof elem && null !== elem)
            $po2(elem);
    });
    const $po0 = (input: any): any => {
        if ("object" === typeof input.info && null !== input.info)
            $pu0(input.info);
        for (const key of Object.keys(input)) {
            if ("announce" === key || "info" === key || "nodes" === key || "announce-list" === key || "url-list" === key)
                continue;
            delete input[key];
        }
    };
    const $po1 = (input: any): any => {
        if (Array.isArray(input.files))
            $pp0(input.files);
        for (const key of Object.keys(input)) {
            if ("files" === key || "length" === key || "name" === key || "piece length" === key || "pieces" === key || "private" === key)
                continue;
            delete input[key];
        }
    };
    const $po2 = (input: any): any => {
        for (const key of Object.keys(input)) {
            if ("length" === key || "path" === key)
                continue;
            delete input[key];
        }
    };
    const $po3 = (input: any): any => {
        for (const key of Object.keys(input)) {
            if ("length" === key || "files" === key || "name" === key || "piece length" === key || "pieces" === key || "private" === key)
                continue;
            delete input[key];
        }
    };
    const $pu0 = (input: any): any => (() => {
        if ("number" === typeof input.length)
            return $po3(input);
        else if (Array.isArray(input.files) && input.files.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)))
            return $po1(input);
        else
            $throws({
                expected: "(SingleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; } | MultipleFileTorrent & { name: Uint8Array; \"piece length\": number; pieces: Uint8Array; private?: 0 | 1; })",
                value: input
            });
    })();
    if ("object" === typeof input && null !== input)
        $po0(input);
};
export const pruneTorrentFileV2FileTree = (input: TorrentFileV2FileTree): void => {
    const $io0 = (input: any): boolean => Object.keys(input).every((key: any) => {
        const value = input[key];
        if (undefined === value)
            return true;
        return "object" === typeof value && null !== value && false === Array.isArray(value) && $iu0(value);
    });
    const $io1 = (input: any): boolean => "number" === typeof input.length && input["pieces root"] instanceof Uint8Array;
    const $iu0 = (input: any): any => (() => {
        if (undefined !== input.length)
            return $io1(input);
        else
            return $io0(input);
    })();
    const $po0 = (input: any): any => {
        Object.entries(input).forEach(([key, value]: any) => {
            if (undefined === value)
                return;
            if (RegExp(/(.*)/).test(key)) {
                if ("object" === typeof value && null !== value)
                    $pu0(value);
            }
        });
        for (const key of Object.keys(input)) {
            if (RegExp(/(.*)/).test(key))
                continue;
            delete input[key];
        }
    };
    const $po1 = (input: any): any => {
        for (const key of Object.keys(input)) {
            if ("length" === key || "pieces root" === key)
                continue;
            delete input[key];
        }
    };
    const $pu0 = (input: any): any => (() => {
        if (undefined !== input.length)
            return $po1(input);
        else
            return $po0(input);
    })();
    if ("object" === typeof input && null !== input)
        $po0(input);
};
export const pruneTorrentFileV2 = (input: TorrentFileV2): void => {
    const $io1 = (input: any): boolean => input.name instanceof Uint8Array && "number" === typeof input["piece length"] && 2 === input["meta version"] && ("object" === typeof input["file tree"] && null !== input["file tree"] && false === Array.isArray(input["file tree"]) && $io2(input["file tree"]));
    const $io2 = (input: any): boolean => Object.keys(input).every((key: any) => {
        const value = input[key];
        if (undefined === value)
            return true;
        return "object" === typeof value && null !== value && false === Array.isArray(value) && $iu0(value);
    });
    const $io3 = (input: any): boolean => "number" === typeof input.length && input["pieces root"] instanceof Uint8Array;
    const $iu0 = (input: any): any => (() => {
        if (undefined !== input.length)
            return $io3(input);
        else
            return $io2(input);
    })();
    const $po0 = (input: any): any => {
        if ("object" === typeof input.info && null !== input.info)
            $po1(input.info);
        for (const key of Object.keys(input)) {
            if ("announce" === key || "info" === key || "piece layers" === key)
                continue;
            delete input[key];
        }
    };
    const $po1 = (input: any): any => {
        if ("object" === typeof input["file tree"] && null !== input["file tree"])
            $po2(input["file tree"]);
        for (const key of Object.keys(input)) {
            if ("name" === key || "piece length" === key || "meta version" === key || "file tree" === key)
                continue;
            delete input[key];
        }
    };
    const $po2 = (input: any): any => {
        Object.entries(input).forEach(([key, value]: any) => {
            if (undefined === value)
                return;
            if (RegExp(/(.*)/).test(key)) {
                if ("object" === typeof value && null !== value)
                    $pu0(value);
            }
        });
        for (const key of Object.keys(input)) {
            if (RegExp(/(.*)/).test(key))
                continue;
            delete input[key];
        }
    };
    const $po3 = (input: any): any => {
        for (const key of Object.keys(input)) {
            if ("length" === key || "pieces root" === key)
                continue;
            delete input[key];
        }
    };
    const $pu0 = (input: any): any => (() => {
        if (undefined !== input.length)
            return $po3(input);
        else
            return $po2(input);
    })();
    if ("object" === typeof input && null !== input)
        $po0(input);
};
