import lexer, { ksmlTokensArray } from "../src/ksmlLexer";
import KsmlParser from "../src/ksmlParser";

describe("parser tests", () => {

    test("parse head ksml", () => {
        const ksml = `
        ksml: 1.0
        title: message in a bottle
        playback: http://www.test.com/song.mp3
        media: http://www.test.com/media.png
        emptyColor: #ffffff
        filledColor: #000000
        `;

        const tokenizedKsml = lexer.tokenize(ksml);
        const parser = new KsmlParser(ksmlTokensArray);
        parser.input = tokenizedKsml.tokens;
        const parseKsml = parser.head();
        expect(parser.errors).toHaveLength(0);
        expect(Object.keys(parseKsml.children)).toEqual(expect.arrayContaining(["ksmlVersion", "title", "playback", "media", "emptyColor", "filledColor"]));
    });

    test("parse body ksml", () => {
        const ksml = `
        >   [](30){media:http://www.test.com/media1.png, emptyColor:#123123,filledColor:#321321}
        >   [](10){show:true}
            [Just a cast away, an island lost at sea, oh](12)
            [Another lonely day, no one here but me, oh](15)
            [More loneliness than any man could bear](11)
            [Rescue me before I fall into despair, oh](9)
        >   [](10){show:true}
            [Just a cast away, an island lost at sea, oh](12)
            [Another lonely day, no one here but me, oh](15)
            [More loneliness than any man could bear](11)
            [Rescue me before I fall into despair, oh](9)
        >   [](1){show:true}
            [I'll send an SOS to the world", duration](6)
            [I hope that someone gets my](6)
            [I hope that someone gets my message in a bottle, yeah](10)
            [Message in a bottle yeah](10)
        `;


        const tokenizedKsml = lexer.tokenize(ksml);
        const parser = new KsmlParser(ksmlTokensArray);
        parser.input = tokenizedKsml.tokens;

        const parseKsml = parser.body();
        expect(parser.errors).toHaveLength(0);

        const screens = parseKsml.children.screen;
        expect(screens).toHaveLength(4);

        const lines = screens.flatMap(t => t.children.line);
        expect(lines).toHaveLength(16);

        const lyrics = lines.flatMap(t => t.children.lyrics.filter(x => x.children.Lyrics));
        expect(lyrics).toHaveLength(12);

        const settings = lines.filter(t => t.children.settings);
        expect(settings).toHaveLength(4);

    });

    test("parse settings with key value ksml", () => {

        const ksml = `
        test: 1
        
        > [](1){show:true, test:2}
        `;

        const tokenizedKsml = lexer.tokenize(ksml);
        const parser = new KsmlParser(ksmlTokensArray);
        parser.input = tokenizedKsml.tokens;
        const parseKsml = parser.ksml();
        expect(parser.errors).toHaveLength(0);

        const headSettings = parseKsml.children.head[0].children;
        const bodySettings =  parseKsml.children.body[0].children.screen[0].children.line[0].children.settings[0].children.settingsOptions[0].children;

        expect(Object.keys(headSettings)).toEqual(expect.arrayContaining(["keyValuePair"]));
        expect(Object.keys(bodySettings)).toEqual(expect.arrayContaining(["show", "keyValuePair"]));

     });

    test.only.each([
      //  ["NotAllInputParsedException",":","NotAllInputParsedException"], //Redundant input, expecting EOF but found: :
      //  ["MismatchedTokenException","test::test","MismatchedTokenException"], //Expecting token of type --> ValueType <-- but found --> ':' <--
        ["MismatchedTokenException","test::test","MismatchedTokenException"],
    ])("fail to parse %s", (name, ksml, errorType) => {
        const tokenizedKsml = lexer.tokenize(ksml);
        const parser = new KsmlParser(ksmlTokensArray);
        parser.input = tokenizedKsml.tokens;
        const parseKsml = parser.ksml();
        expect(parser.errors).toHaveLength(1); 
     });


    test("parse full ksml", () => {
        const ksml = `
        ksml: 1.0
        title: message in a bottle
        playback: http://www.test.com/song.mp3
        media: http://www.test.com/media.png
        emptyColor: #ffffff
        filledColor: #000000
        
        >   [](30){media:http://www.test.com/media1.png, emptyColor:#123123,filledColor:#321321}
        >   [](10){show:true}
            [Just a cast away, an island lost at sea, oh](12)
            [Another lonely day, no one here but me, oh](15)
            [More loneliness than any man could bear](11)
            [Rescue me before I fall into despair, oh](9)
        >   [](10){show:true}
            [Just a cast away, an island lost at sea, oh](12)
            [Another lonely day, no one here but me, oh](15)
            [More loneliness than any man could bear](11)
            [Rescue me before I fall into despair, oh](9)
        >   [](1){show:true}
            [I'll send an SOS to the world", duration](6)
            [I hope that someone gets my](6)
            [I hope that someone gets my message in a bottle, yeah](10)
            [Message in a bottle yeah](10)
        `;

        const tokenizedKsml = lexer.tokenize(ksml);
        expect(tokenizedKsml.errors).toHaveLength(0);

        const parser = new KsmlParser(ksmlTokensArray);
        parser.input = tokenizedKsml.tokens;
        parser.ksml();
        expect(parser.errors).toHaveLength(0);

    });



});