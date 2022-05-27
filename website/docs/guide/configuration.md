# Configuration

A karaoke clip is being defined in a `ksml` format.  
`ksml` consists of a header where global definitions reside and a body that describe how the lyrics are being distributed across the screen.  
A karaetor clip can be **semi-portable** - assets references are local or relative and can only be ported if bundled or if assets are externaly/manualy taken cared of.  
or **fully-portable** - assets references are absolute (URIs) or encoded (base64) so a single ksml definition can be exported and imported elsewhere.

for example
```ksml
ksml: 1.0
title: sing
playback: https://file-example.com/song.mp3
media:  https://file-example.com/background.jpg
emptyColor: #fff
filledColor: #000

> [](30){show:true}
  [sing along and time your lines](15)
  [configure each line and make it shine](20)
> [break the lyrics into screens](12){emptyColor: #336699, filledColor: gold}
  [it's kinda hard to squeeze them in](16)
```


## Header
- `version` - ksml version
- `title` - clip title (song name)
- `playback` - audo resource
- `media` - default screen background
- `emptyColor` - the color of the lyrics before they were sung
- `filledColor` - the color of the lyrics after the were sung

::: info
The karaetor definition supports user-defined `key: value` definitions for compatibility reasons and will return them as-is.  
The returned type will be a string and it is up to the platform to parse them to other types as needed.

There might be a colision between a fully supported key in later versions and a previously specified custom key. 
The convension is to name a custom key with the prefix `x-`
:::


The header syntax assume that:
- There is a line break after each setting.
- There is a colon between the key and the value.
- Each key has a specific value type it supports (see [api](api#header)).
- Leading and trailing key and value whitespaces are being ignored. Whitespaces inside a value are being preserved. For example, the whitespaces in the `title` value.
- Header properties must be in one block either at the begining of the `ksml` or at the end.
- None of the properties are required and a platform can set a platform-specific default values to each property. A karaoke clip without a version can be assumed as the latest, a clip without a playback can be played without audio etc.
- Properties names are case-sesitive.


## Body
- `>` - a new screen indicator
- `[]` - a lyrics line
- `()` - the time it takes to sing the line or the timing buffer counter
- `{}` - the screen/line specific setting

The body syntax assume that:
- It must start with a screen indicator (`>`).
- There can't be an empty screen.
- A line must include lyrics brackets (empty or not) and a timing ( `[](10)`).
- The order of the line parts matters, it goes (`>`) `[]` `()` (`{}`) (optional screen - lyrics - timing - optional settings).
- The timing can't be empty.
- There is a line break after each line.
- Leading and trailing whitespaces before and after line parts are being ignored. Whitespaces inside lyrics and a setting value are being preserved.
- Screens must be defined in one block, before or after the header.
- Settings are defined as a `key:value` with a colon between the key and the value and a comma seperating each pair, a trailing comma is ignored.
- None of the settings are required, [see defaults](api#settings) for specific keys.


## Screen
A karaoke clip is consists of one or more screens. In general, a screen can usualy display up to 9 lines of lyrics (a line of lyrics can be a result of a line break in one timing line) and 35 characters in one line. 

There is no font size specification and the minimum is 12pt and the maximum is 35 letters in one line (considering the 10% margin size of the title-safe zone defined by SMPTE). A karaetor-supported platform can decide whether to scale the font size by these limitations or keep the font size fixed.  

There is no font family specification and each platform can choose the default font family, The only restrictions are to use UTF16+ fonts that are strictly corresponding to fonts sizes (all characters dimensions are strictly in the size of the specified points).

## Timing
Lyrics are timed according to how long they should be sang.   
The timing is being measured in seconds.
Timed lyrics don't have to be a full sentence to allow mid-sentence change-of-pace.  

There are 3 types of timings:  
- <u>Timed Lyrics</u>  
    The lyrics letters should be filled in 5 seconds.
    ```
    [sing this](5)
    ```  

- <u>Timed Buffer</u>  
    No lyrics should be displayed for 5 seconds, the playback continue to be played.
    ```
    [](5)
    ```  

- <u>Timed Counter</u> 
    An indicator should appear for 5 seconds. There is no specification regarding which indicator, it can numbers going from 1 to `<time>` or dots filled in or any other indicator
    ```
    [](5){show:true}
    ```    



## Playback
There is no restriction regarding the content of the playback audio and a karaoke clip is not required to have a playback.  
(having said that, a karaoke clip usually has an audio stream without vocals to accompany the singer).  
In a _semi-portable_ mode, a playback can be a relative reference to a local file (no POSIX or win32 path restrictions).
In a _fully-portable_ mode, a playback must be an absolute URI or an encoded file in base64.


## Media

## Color

## Version

