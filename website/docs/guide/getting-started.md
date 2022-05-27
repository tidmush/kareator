# Getting Started

You can see how a `ksml` is being configured and built by playing with [rock me karaetor]() website.

## The Basics
A compatible karaoke clip consists of a single main playback and a list of screens.  
Each screen consists of a list of timings.  
Each timing can be:
- a timeframe without display - a counter that is used as a time buffer between lines
- a counter - a counter with an indicator that times a buffer between lines
- a line - a line of lyrics that should be sang

## Required Support
A karaetor-compliant platform should be capable of:
- Handling ksml [definition versions](configuration#version) with backward compatibility.
- Handling default [playback](configuration#playback), a [media background](configuration#media) and [colors](configuration#color).
- Handling multiple screens and the 3 timing types.
- Handling specific settings for each timing. 
