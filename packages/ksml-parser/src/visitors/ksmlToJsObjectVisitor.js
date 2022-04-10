import KsmlParser from "../ksmlParser";
import { ksmlTokensArray } from "../ksmlLexer";

const ksmlParser = new KsmlParser(ksmlTokensArray);
const BaseKsmlVisitor = ksmlParser.getBaseCstVisitorConstructor();




export default class KsmlToJsObjectVisitor extends BaseKsmlVisitor {
    constructor() {
        super();
        this.validateVisitor();

        this.valueParser = {
            Boolean(value) { return value.toLowerCase() === "true"; },
            ValueLiteral(value) { return value; },
            Url(value) { return value; },
            Color(value) { return value; },
            NumberLiteral(value) { return 1 * value; }
        };



    }

    ksml(ctx) {
        const head = this.visit(ctx.head);
        const body = this.visit(ctx.body);
        return { head, body };
    }

    head(ctx) {
        let head = {};
        if (ctx.ksmlVersion) head.ksml = this.visit(ctx.ksmlVersion);
        if (ctx.title) head.title = this.visit(ctx.title);
        if (ctx.playback) head.playback = this.visit(ctx.playback);
        if (ctx.media) head.media = this.visit(ctx.media);
        if (ctx.emptyColor) head.emptyColor = this.visit(ctx.emptyColor);
        if (ctx.filledColor) head.filledColor = this.visit(ctx.filledColor);
        if (ctx.keyValuePair) Object.assign(head, ctx.keyValuePair.reduce((acc, val) => (Object.assign(acc, this.visit(val))), {}));
        return head;
    }

    body(ctx) {
        return ctx.screen.map(scr => this.visit(scr));
    }

    settingsOptions(ctx) {
        let options = {};
        if (ctx.show) options.show = this.visit(ctx.show);
        if (ctx.media) options.media = this.visit(ctx.media);
        if (ctx.emptyColor) options.emptyColor = this.visit(ctx.emptyColor);
        if (ctx.filledColor) options.filledColor = this.visit(ctx.filledColor);
        if (ctx.keyValuePair) Object.assign(options, ctx.keyValuePair.reduce((acc, val) => (Object.assign(acc, this.visit(val))), {}));
        return options;
    }

    lyrics(ctx) {
        if (!ctx || !ctx.Lyrics || ctx.Lyrics.length === 0) return null;
        return ctx.Lyrics[0].image;
    }

    timing(ctx) {
        if (!ctx || !ctx.Timing || ctx.Timing.length === 0) return null;
        return 1 * ctx.Timing[0].image;
    }

    settings(ctx) {
        return this.visit(ctx.settingsOptions);
    }

    line(ctx) {
        const timing = this.visit(ctx.timing);
        const lyrics = this.visit(ctx.lyrics);
        const settings = this.visit(ctx.settings);
        return { timing, lyrics, settings };
    }
    screen(ctx) {
        return ctx.line.map(ln => this.visit(ln));
    }

    ksmlVersion(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return 1 * ctx.Value[0].image;
    }

    title(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return ctx.Value[0].image;
    }

    playback(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return ctx.Value[0].image;
    }

    media(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return ctx.Value[0].image;
    }

    emptyColor(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return ctx.Value[0].image;
    }

    filledColor(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return ctx.Value[0].image;
    }

    show(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return ctx.Value[0].image.toLowerCase() === "true";
    }

    keyValuePair(ctx) {
        if (!ctx || !ctx.Value || ctx.Value.length === 0) return null;
        return { [ctx.Key[0].image]: this.valueParser[ctx.Value[0].tokenType.name](ctx.Value[0].image) }
    }
}