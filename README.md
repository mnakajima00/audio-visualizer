
#Audio Visualizer
An audio visualizer made using HTML/CSS, Javascript and its' Web Audio API. 

##Thought process & difficulties encountered.
1. How do you visualize sound?
  - With a little research, I decided that the most common way to visualize sound or music was with two things: Frequency(Pitch) and Amplitude(Loudness). Luckily, by using javascripts' web audio API, we have an amazing algorithm called the Fast Fourier Transform (or FFT). It basically breaks down audio into individual frequencies and its amplitude (you can read more about it [here](https://www.nti-audio.com/en/support/know-how/fast-fourier-transform-fft).
  - The rest was just about reading the [Web Audio API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) and also using the Canvas API for drawing the graph.
2. Trying to make the graph circular.
- If you saw the [demo](https://maikunakajima.com/audio-visualizer/), you can see how the graph is circular. This was quite a fun problem to solve. It uses a neat mathematical formula to plot each "bar" in a circle. 
    - x = originX + cos(angle)*radius;
    - y = originY + sin(angle)*radius;
- This formula can be seen used in the index.js file in the renderFrame() method.


##Next Step
- Spotify Music Visualizer. Due to obvious reasons, there's no way to get the raw audio file from spotify, but they do provide some audio analysis from their Spotify API. 
