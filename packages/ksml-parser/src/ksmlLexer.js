import { createToken, Lexer } from "chevrotain";

export const KeyType = createToken({ name: "KeyType", pattern: Lexer.NA });
export const ValueType = createToken({ name: "ValueType", pattern: Lexer.NA });
export const Identifier = createToken({ name: "Identifier", pattern: /([a-zA-Z0-9]*)(?=:)/, categories: [KeyType] });
export const ksmlTokens = {
    ValueType,
    Identifier,
    WhiteSpace: createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED }),
    StringLiteral: createToken({ name: "StringLiteral", pattern: /(?!\[)[^\n\[\]]*(?=\])/ }),
    NumberLiteral: createToken({ name: "NumberLiteral", pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?\b/, categories: [ValueType] }),
    ValueLiteral: createToken({ name: "ValueLiteral", pattern: /(:?[^\\"\n\r]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))+/, categories: [ValueType] }),
    Url: createToken({ name: 'Url', pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, categories: [ValueType] }),
    Color: createToken({ name: "Color", pattern: /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})\b|(?:rgb|hsl)a?\([^\)]*\)/, categories: [ValueType] }),
    Boolean: createToken({ name: "Boolean", pattern: /(true|false)/, categories: [ValueType] }),
    KsmlVersion: createToken({ name: "KsmlVersion", pattern: /ksml/, longer_alt: Identifier, categories: [KeyType] }),
    Title: createToken({ name: "Title", pattern: /title/, longer_alt: Identifier, categories: [KeyType] }),
    Playback: createToken({ name: "Playback", pattern: /playback/, longer_alt: Identifier, categories: [KeyType] }),
    Media: createToken({ name: "Media", pattern: /media/, longer_alt: Identifier, categories: [KeyType] }),
    EmptyColor: createToken({ name: "EmptyColor", pattern: /emptyColor/, longer_alt: Identifier, categories: [KeyType] }),
    FilledColor: createToken({ name: "FilledColor", pattern: /filledColor/, longer_alt: Identifier, categories: [KeyType] }),
    Show: createToken({ name: "Show", pattern: /show/, longer_alt: Identifier, categories: [KeyType] }),
    Comma: createToken({ name: "Comma", pattern: /,/ }),
    Colon: createToken({ name: "Colon", pattern: /:/ }),
    LCurly: createToken({ name: "LCurly", pattern: /{/ }),
    RCurly: createToken({ name: "RCurly", pattern: /}/ }),
    LSquare: createToken({ name: "LSquare", pattern: /\[/ }),
    RSquare: createToken({ name: "RSquare", pattern: /]/ }),
    LRound: createToken({ name: "LRound", pattern: /\(/ }),
    RRound: createToken({ name: "RRound", pattern: /\)/ }),
    RAngle: createToken({ name: "RAngle", pattern: /\>/ })
};

export const ksmlTokensArray = [
    ksmlTokens.WhiteSpace,

    ksmlTokens.LCurly,
    ksmlTokens.RCurly,
    ksmlTokens.LSquare,
    ksmlTokens.RSquare,
    ksmlTokens.LRound,
    ksmlTokens.RRound,
    ksmlTokens.RAngle,

    ksmlTokens.KsmlVersion,
    ksmlTokens.Title,
    ksmlTokens.Playback,
    ksmlTokens.Media,
    ksmlTokens.EmptyColor,
    ksmlTokens.FilledColor,
    ksmlTokens.Show,

    ksmlTokens.Colon,
    ksmlTokens.Comma,

    ksmlTokens.ValueType,
    ksmlTokens.Url,
    ksmlTokens.Color,
    ksmlTokens.Boolean,
    ksmlTokens.Identifier,
    ksmlTokens.StringLiteral,
    ksmlTokens.NumberLiteral,
    ksmlTokens.ValueLiteral
];


const lexer = new Lexer(ksmlTokensArray);


ksmlTokens.Comma.LABEL = "','";
ksmlTokens.Colon.LABEL = "':'";
ksmlTokens.RAngle.LABEL = "'>'";
ksmlTokens.LCurly.LABEL = "'{'";
ksmlTokens.RCurly.LABEL = "'}'";
ksmlTokens.LRound.LABEL = "'('";
ksmlTokens.RRound.LABEL = "')'";
ksmlTokens.LSquare.LABEL = "'['";
ksmlTokens.RSquare.LABEL = "']'";



export default lexer;