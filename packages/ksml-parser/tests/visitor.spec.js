import lexer, { ksmlTokensArray } from "../src/ksmlLexer";
import KsmlParser from "../src/ksmlParser";
import KsmlToJsObjectVisitor from "../src/visitors/ksmlToJsObjectVisitor";

describe("converter tests", () => {

    test("convert ksml", () => {
        const ksml = `
        ksml: 1.0
        title: message in a bottle
        playback: http://www.test.com/song.mp3
        media: http://www.test.com/media.png
        emptyColor: #ffffff
        filledColor: #000000
        yotam: test
        toyotam: totest
        
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
        `;

        const tokenizedKsml = lexer.tokenize(ksml);
        const parser = new KsmlParser(ksmlTokensArray);
        parser.input = tokenizedKsml.tokens;
        const context = parser.ksml();
        const converter = new KsmlToJsObjectVisitor();
        const ksmlObject = converter.visit(context);
        expect(ksmlObject).toMatchObject({
            head: {
                ksml: 1,
                title: "message in a bottle",
                playback: "http://www.test.com/song.mp3",
                media: "http://www.test.com/media.png",
                emptyColor: "#ffffff",
                filledColor: "#000000",
                yotam: "test",
                toyotam: "totest"
            },
            body: [
                [{ timing: 30, lyrics: null, settings: { media: "http://www.test.com/media1.png", emptyColor: "#123123", filledColor: "#321321" } }],
                [
                    { timing: 10, lyrics: null, settings: { show: true } },
                    { timing: 12, lyrics: "Just a cast away, an island lost at sea, oh" },
                    { timing: 15, lyrics: "Another lonely day, no one here but me, oh" },
                    { timing: 11, lyrics: "More loneliness than any man could bear" },
                    { timing: 9, lyrics: "Rescue me before I fall into despair, oh" }
                ],
                [
                    { timing: 10, lyrics: null, settings: { show: true } },
                    { timing: 12, lyrics: "Just a cast away, an island lost at sea, oh" },
                    { timing: 15, lyrics: "Another lonely day, no one here but me, oh" },
                    { timing: 11, lyrics: "More loneliness than any man could bear" },
                    { timing: 9, lyrics: "Rescue me before I fall into despair, oh" }
                ]
            ]
        });





    });



});