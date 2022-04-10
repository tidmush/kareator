import { CstParser } from "chevrotain";
import { ksmlTokens } from "./ksmlLexer";


export default class KsmlParser extends CstParser {
    constructor(tokens) {
        super(tokens, { recoveryEnabled: true });

        const $ = this;

        //v1.0
        $.RULE("ksml", () => {
            $.SUBRULE($.head);
            $.SUBRULE($.body);
        });


        //v1.0
        $.RULE("head", () => {
            $.MANY(() => {
                $.OR([
                    { ALT: () => { $.SUBRULE($.ksmlVersion) } },
                    { ALT: () => { $.SUBRULE($.title) } },
                    { ALT: () => { $.SUBRULE($.playback) } },
                    { ALT: () => { $.SUBRULE($.media) } },
                    { ALT: () => { $.SUBRULE($.emptyColor) } },
                    { ALT: () => { $.SUBRULE($.filledColor) } },
                    { ALT: () => { $.SUBRULE($.keyValuePair) } },
                ]);
            });
        });


        $.RULE("body", () => {
            $.MANY(() => {
                $.SUBRULE($.screen);
            });
        });

        //v1.0
        $.RULE("settingsOptions", () => {
            $.MANY_SEP({
                SEP: ksmlTokens.Comma,
                DEF: () => {
                    $.OR([
                        { ALT: () => { $.SUBRULE($.show) } },
                        { ALT: () => { $.SUBRULE($.media) } },
                        { ALT: () => { $.SUBRULE($.emptyColor) } },
                        { ALT: () => { $.SUBRULE($.filledColor) } },
                        { ALT: () => { $.SUBRULE($.keyValuePair) } }
                    ]);
                }
            })
        });

        //v1.0
        $.RULE("lyrics", () => {
            $.CONSUME(ksmlTokens.LSquare);
            $.OPTION(() => {
                $.CONSUME(ksmlTokens.StringLiteral, { LABEL: "Lyrics" });
            });
            $.CONSUME(ksmlTokens.RSquare);
        });

        //v1.0
        $.RULE("timing", () => {
            $.CONSUME(ksmlTokens.LRound);
            $.CONSUME(ksmlTokens.NumberLiteral, { LABEL: "Timing" });
            $.CONSUME(ksmlTokens.RRound);
        });

        //v1.0
        $.RULE("settings", () => {
            $.CONSUME(ksmlTokens.LCurly);
            $.OPTION(() => {
                $.SUBRULE($.settingsOptions);
            });
            $.CONSUME(ksmlTokens.RCurly);
        });

        $.RULE("line", () => {
            $.SUBRULE($.lyrics);
            $.SUBRULE($.timing);
            $.OPTION(() => {
                $.SUBRULE($.settings);
            });
        });

        //v1.0
        $.RULE("screen", () => {
            $.CONSUME(ksmlTokens.RAngle);
            $.MANY(() => {
                $.SUBRULE($.line);
            });
        });





        //v1.0
        $.RULE("ksmlVersion", () => {
            $.CONSUME(ksmlTokens.KsmlVersion);
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.NumberLiteral, { LABEL: "Value" });
        });

        //v1.0
        $.RULE("title", () => {
            $.CONSUME(ksmlTokens.Title);
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.ValueLiteral, { LABEL: "Value" });
        });

        //v1.0
        $.RULE("playback", () => {
            $.CONSUME(ksmlTokens.Playback);
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.Url, { LABEL: "Value" });
        });

        //v1.0
        $.RULE("media", () => {
            $.CONSUME(ksmlTokens.Media);
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.Url, { LABEL: "Value" });
        });

        //v1.0
        $.RULE("emptyColor", () => {
            $.CONSUME(ksmlTokens.EmptyColor);
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.Color, { LABEL: "Value" });
        });

        //v1.0
        $.RULE("filledColor", () => {
            $.CONSUME(ksmlTokens.FilledColor);
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.Color, { LABEL: "Value" });
        });

        //v1.0
        $.RULE("show", () => {
            $.CONSUME(ksmlTokens.Show);
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.Boolean, { LABEL: "Value" });
        });


        //v1.0
        $.RULE("keyValuePair", () => {
            $.CONSUME(ksmlTokens.Identifier, { LABEL: "Key" });
            $.CONSUME(ksmlTokens.Colon);
            $.CONSUME(ksmlTokens.ValueType, { LABEL: "Value" });
        });


        this.performSelfAnalysis();
    }

}