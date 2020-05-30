"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = exports.Cell = exports.Header = exports.Table = void 0;
const PropTypes = __importStar(require("prop-types"));
const React = __importStar(require("react"));
const ink_1 = require("ink");
const Header = ({ children }) => React.createElement(ink_1.Color, { bold: true }, children);
exports.Header = Header;
Header.propTypes = {
    children: PropTypes.any.isRequired,
};
const Cell = ({ children }) => React.createElement(ink_1.Color, null, children);
exports.Cell = Cell;
Cell.propTypes = {
    children: PropTypes.any.isRequired,
    focused: PropTypes.bool,
};
Cell.defaultProps = {
    focused: false,
};
const Skeleton = ({ children }) => React.createElement(ink_1.Color, null, children);
exports.Skeleton = Skeleton;
Skeleton.propTypes = {
    children: PropTypes.any.isRequired,
};
const get = (key) => (obj) => obj[key];
const length = (el) => el.length;
const isUndefined = (v) => v === undefined;
const not = (func) => (...args) => !func(...args);
const toString = (val) => (val || String()).toString();
const isEmpty = (el) => el.length === 0;
const intersperse = (val) => (vals) => vals.reduce((s, c, i) => (isEmpty(s) ? [c] : [...s, val(i), c]), []);
const fillWith = (el) => (length) => (str) => `${str}${el.repeat(length - str.length)}`;
const getCells = (columns) => (data) => columns.map(({ width, key }) => ({ width, key, value: get(key)(data) }));
const union = (...arrs) => [...new Set([].concat(...arrs))];
const generateColumn = (padding) => (data) => (key) => {
    const allColumns = data.map(get(key));
    const columnsWithValues = allColumns.filter(not(isUndefined));
    const vals = columnsWithValues.map(toString);
    const lengths = vals.map(length);
    const width = Math.max(...lengths, key.length) + padding * 2;
    return { width, key };
};
const copyToObject = (func) => (arr) => arr.reduce((o, k) => (Object.assign(Object.assign({}, o), { [k]: func(k) })), {});
const generateHeadings = (keys) => copyToObject((key) => key)(keys);
const generateSkeleton = (keys) => copyToObject(() => "")(keys);
const line = (key, Cell, Skeleton, { line, left, right, cross, padding }) => (cells, index = "") => {
    const fillWithLine = fillWith(line);
    const columns = cells.map(({ width, key, value }, i) => (React.createElement(Cell, { key: key + String(i) },
        line.repeat(padding),
        fillWithLine(width - padding)(toString(value)))));
    return (React.createElement(ink_1.Box, { key: key + String(index) },
        React.createElement(Skeleton, null, left),
        intersperse((i) => React.createElement(Skeleton, { key: i }, cross))(columns),
        React.createElement(Skeleton, null, right)));
};
const Table = ({ data, padding, header, cell, skeleton }) => {
    const topLine = line("top", skeleton, skeleton, {
        line: "─",
        left: "┌",
        right: "┐",
        cross: "┬",
        padding,
    });
    const bottomLine = line("bottom", skeleton, skeleton, {
        line: "─",
        left: "└",
        right: "┘",
        cross: "┴",
        padding,
    });
    const midLine = line("mid", skeleton, skeleton, {
        line: "─",
        left: "├",
        right: "┤",
        cross: "┼",
        padding,
    });
    const headers = line("header", header, skeleton, {
        line: " ",
        left: "│",
        right: "│",
        cross: "│",
        padding,
    });
    const row = line("row", cell, skeleton, {
        line: " ",
        left: "│",
        right: "│",
        cross: "│",
        padding,
    });
    const keys = union(...data.map(Object.keys));
    const columns = keys.map(generateColumn(padding)(data));
    const headings = generateHeadings(keys);
    const _skeleton = generateSkeleton(keys);
    const getRow = getCells(columns);
    const headersRow = getRow(headings);
    const emptyRow = getRow(_skeleton);
    const rows = data.map((d, i) => row(getRow(d), i));
    return (React.createElement("span", null,
        topLine(emptyRow),
        headers(headersRow),
        midLine(emptyRow),
        intersperse(() => "")(rows),
        bottomLine(emptyRow)));
};
exports.Table = Table;
Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    padding: PropTypes.number,
    header: PropTypes.func,
    cell: PropTypes.func,
    skeleton: PropTypes.func,
};
Table.defaultProps = {
    data: [],
    padding: 1,
    header: Header,
    cell: Cell,
    skeleton: Skeleton,
};
