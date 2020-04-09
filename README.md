You can sing it, why not config it?

# Kareator
This project aims to design standards for creating and consuming karaoke instructions to be used publicly and freely

This project contains several tools and apps as well as some definitions


# Configuration
## ksml (karaoke standard markup language)
ksml is a standard way to write instructions to ksml supporting apps and tools

### structure

a simple ksml looks like this:

```
ksml: 1.0
title: My Song
song: https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3
media: https://file-examples.com/wp-content/uploads/2017/10/file_example_JPG_100kB.jpg
emptycolor:#000000
fillcolor:#ffffff

>   [1...2...3...](30){media:https://file-examples.com/wp-content/uploads/2017/10/file_example_JPG_100kB.jpg}
>   [What though the radiance](22)
    [which was once so bright](30)
    [Be now for ever taken from my sight](24)
>   [Though nothing can bring](20)
    [back the hour](10)
>   [](40){show:true}
>   [Of splendour in the grass](35)
    [of glory in the flower](25)
>   [We will grieve not](20)
    [rather find](5)
>   [](120)
>   [Strength in what remains behind](100)




```

#### head
different properties can be specified in the head section, every property seperated **by a new line**

|property|description|required|
|--|--|--|
|ksml|Define the ksml version so parsers would know how to read the file||
|title|The name of the song||
|song|a url to the song file. file support is dependent on the tool you use to create the karaoke clip file|yes|
|media|A url to a default media file that will be used as abackground to the karaoke screens. in general, karaoke build tools should support different file type like images, video clips and anumated gifs|no (a default background like solid color should be applied on the karaoke screens)|
|emptycolor|indicats what will be the color of the unsung words. build tools should specify in which color schemes they support|no (a default color should be appliedby the tool builders)|
|fillcolor|indicats what will be the color of the sung words. build tools should specify in which color schemes they support|no (a default color should be appliedby the tool builders)|

#### body
will be seperated from the head by a clear line and will be stucture with these symbols:

|symbol|instruction|remarks|
|--|--|--|
|> (< for rtl support)|initiate new screen|indicates a new screen for the lines that follow until the next symbol|
|[]|a new line|indicated a new line to time, it can be with lyrics or empty|
|()|timing is seconds|indicates how long the lyrics will be colored linearly|
|{}|additinal properties|mark lines with additional properties|


#### line additional properties
more properties to fine-tune the lines

|property|type|description|default|
|--|--|--|--|
|show|boolean|show time counter if ther are no lyrics in the line|false|
|media|uri|a url to the media that will be displayed in the background|the default media specified in the header or default media defined in the tool|
|emptycolor|color code|the color of the unsung words|default color in header or in tool settings|
|fillcolor|color code|the color of the sung words|default color in header or in tool settings



# How to use

## Kareator (App)
Use Kareator app to build your own karaoke .ksml file and even play it for your own amusement

### installation and set up

TBD (when it will be deployed to npm)

> Kareator maunal can be found on Kareator app github page


## Kareator Video generator
Import a .ksml file and export a karaoke video with it

### installation and set up

TBD (when it will be deployed to npm)

> Specific instructions can be found on Kareator Video generator github page


## Tools

- [js-converter]() - will convert ksml to js object
- [eslint-ksml]() - ksml linter


# Contributing
This project is currently inside the womb of the R&D phase, so there is nothing to contribute yet, but I would be happy to hear from you via github

# License
Kareator project, ksml structure, and all of its repositories are open source softwares licensed as MIT.