---
home: true
title: Home
heroImage: /images/logo.svg
actionText: Get Started
actionLink: /guide/introduction
features:
  - title: Simple
    details: A small configuration footprint, stripped-down of unecessary structure characters.
  - title: Comprehensive
    details: Supports many timing styles, screen modifications and portability modes.
  - title: Easy to Implement
    details: With plugins and other extensions, any project can support it.
footer: MIT Licensed | Copyright © 2022-present Atid Mushlam
---

### A simple yet powerfull standard of defining a karaoke clip


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