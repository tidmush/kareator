import ksmlLexer from "../src/ksmlLexer";

describe("lexer tests", () => {


    test("lex head", () => {
        const ksml = `
        ksml: 1.0
        title: message in a bottle
        playback: http://www.test.com/song.mp3
        media: http://www.test.com/media.png
        emptyColor: #ffffff
        filledColor: #000000
        `;

        const tokenizedKsml = ksmlLexer.tokenize(ksml);
        expect(tokenizedKsml.errors).toHaveLength(0);
        expect(tokenizedKsml.tokens.flatMap(t => t.tokenType.CATEGORIES.filter(c => c.name === "KeyType"))).toHaveLength(6);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "NumberLiteral")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "ValueLiteral")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Url")).toHaveLength(2);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Color")).toHaveLength(2);
    });

    test("lex body", () => {
        const ksml = `
        >   [](30){media:http://www.test.com/media1.png, emptyColor:#123123,filledColor:#321321}
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

        const tokenizedKsml = ksmlLexer.tokenize(ksml);
        expect(tokenizedKsml.errors).toHaveLength(0);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "RAngle")).toHaveLength(3);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "StringLiteral")).toHaveLength(8);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "NumberLiteral")).toHaveLength(11);

    });

    test("lex key value pairs", () => {
        const ksml = `
        test1:1
        test2:test
        test3: #445566
        test4: http://test.com
        test5: 1q1
        `;

        const tokenizedKsml = ksmlLexer.tokenize(ksml);
        expect(tokenizedKsml.errors).toHaveLength(0);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Identifier")).toHaveLength(5);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "NumberLiteral")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "ValueLiteral")).toHaveLength(2);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Url")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Color")).toHaveLength(1);
    });

    test("lex multiline lyrics", () => {
        const ksml = `
        >   [Just a cast away, an island lost at sea, oh,
                Just a cast away, an island lost at sea, oh,
                Just a cast away, an island lost at sea, oh,
                Just a cast away, an island lost at sea, oh](12)
        `;

        const tokenizedKsml = ksmlLexer.tokenize(ksml);
        expect(tokenizedKsml.errors).toHaveLength(0);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "StringLiteral")).toHaveLength(1);
    });

    test("lex lyrics settings", () => {
        const ksml = `
        >   [](30){show:true, media:http://www.test.com/media1.png, emptyColor:#123123, filledColor:#321321}
        `;

        const tokenizedKsml = ksmlLexer.tokenize(ksml);
        expect(tokenizedKsml.errors).toHaveLength(0);
        expect(tokenizedKsml.tokens.flatMap(t => t.tokenType.CATEGORIES.filter(c => c.name === "KeyType"))).toHaveLength(4);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Boolean")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Url")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Color")).toHaveLength(2);

    });
    test("fail lex head", () => {
        const unknownChar = ksmlLexer.tokenize(` test*test `);
        expect(unknownChar.tokens.flatMap(t => t.tokenType.CATEGORIES.filter(c => c.name === "KeyType"))).toHaveLength(0);
        const noIdentifier = ksmlLexer.tokenize(` test test `);
        expect(noIdentifier.tokens.flatMap(t => t.tokenType.CATEGORIES.filter(c => c.name === "KeyType"))).toHaveLength(0);
        const multiInline = ksmlLexer.tokenize(` test: test: test `);
        expect(multiInline.tokens.filter(t => t.tokenType.name === "Identifier")).toHaveLength(2);
        const colons = ksmlLexer.tokenize(`::-:-`);
        expect(colons.tokens.filter(t => t.tokenType.name === "Colon")).toHaveLength(2);
     });

    test("lex full ksml", () => {
        const ksml = `
        ksml: 1.0
        title: message in a bottle
        playback: http://www.test.com/song.mp3
        media: http://www.test.com/media.png
        emptyColor: #ffffff
        filledColor: #000000
        test: test
        
        >   [](30){media:http://www.test.com/media1.png, emptyColor:#123123,filledColor:#321321}
        >   [](10){show:true}
            [Just a cast away, an island lost at sea, oh](12)
            [Another lonely day, no one here but me, oh](15)
            [More loneliness than any man could bear](11)
            [Rescue me before I fall into despair, oh](9)
        >   [](1){show:true}
            [I'll send an SOS to the world](6)
            [I hope that someone gets my](6)
            [I hope that someone gets my message in a bottle, yeah](10)
            [Message in a bottle yeah](10)
        `;


        const tokenizedKsml = ksmlLexer.tokenize(ksml);
        expect(tokenizedKsml.errors).toHaveLength(0);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "KsmlVersion")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Title")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Playback")).toHaveLength(1);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Media")).toHaveLength(2);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "EmptyColor")).toHaveLength(2);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "FilledColor")).toHaveLength(2);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Show")).toHaveLength(2);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Identifier")).toHaveLength(1);

        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "NumberLiteral")).toHaveLength(12);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "StringLiteral")).toHaveLength(8);
        expect(tokenizedKsml.tokens.filter(t => t.tokenType.name === "Url")).toHaveLength(3);       
    });

});