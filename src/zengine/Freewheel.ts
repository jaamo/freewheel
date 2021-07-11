import * as Tone from "tone";
import { Piano } from "@tonejs/piano";
import { shuffleArray } from "./helpers/shuffleArray";
import { changeOctave } from "./helpers/changeOctave";

export class Freewheel {
  constructor() {
    console.log("Freewheel meditation soundscape engine initializing...");

    const chordProgressions = [
      [
        ["C2", "E2", "G2"],
        ["D2", "F2", "A2", "C3"],
        ["G2", "B2", "D3"],
        ["D2", "F2", "A2"],
      ],
    ];

    // Effects
    const reverb = new Tone.Reverb(10).toDestination();
    // const vibrato = new Tone.Vibrato(0.5, 0.2).toDestination();
    // const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();

    // Instruments
    const piano = new Piano({
      velocities: 5,
      url: "/samples/piano",
      volume: {
        harmonics: -12,
        keybed: -12,
        pedal: -12,
        strings: -12,
      },
    });
    piano.connect(reverb);
    // piano.connect(vibrato);
    // piano.connect(chorus);
    piano.toDestination();

    const bowl = new Tone.Player(
      "/samples/SOUL_POTION_singing_bowl_one_shot_billi_G.wav"
    ).toDestination();
    bowl.volume.value = -6;

    const kick = new Tone.Player("/samples/drums/kick/1.wav")
      .connect(reverb)
      .toDestination();
    kick.volume.value = -10;
    // const snare = new Tone.Player("/samples/drums/snare/1.wav")
    //   .connect(reverb)
    //   .toDestination();
    // const hihat = new Tone.Player("/samples/drums/hihat/1.wav")
    //   .connect(reverb)
    //   .toDestination();
    // hihat.volume.value = -6;

    const forestBirds = new Tone.Player(
      "/samples/atmospheres/forest-birds.mp3"
    ).toDestination();
    forestBirds.volume.value = -10;

    const strings = new Tone.Sampler({
      urls: {
        C3: "C3.wav",
        "C#3": "Cs3.wav",
        D3: "D3.wav",
        "D#3": "Ds3.wav",
        E3: "E3.wav",
        F3: "F3.wav",
        "F#3": "Fs3.wav",
      },
      release: 1,
      baseUrl: "/samples/strings/violin/",
    }).toDestination();
    strings.volume.value = -20;

    const choir = new Tone.Sampler({
      urls: {
        C2: "C2.wav",
        "C#2": "Cs2.wav",
        D2: "D2.wav",
        "D#2": "Ds2.wav",
        E2: "E2.wav",
        F2: "F2.wav",
        "F#2": "Fs2.wav",
      },
      release: 1,
      baseUrl: "/samples/strings/male-choir/",
    }).toDestination();
    choir.volume.value = -10;

    piano.load();
    // piano.load().then(() => {
    //   console.log("piano loaded!");
    //   piano.keyDown({ note: "C4", time: "+1" });
    // });

    let currentChordProgression = 0;
    let currentChord = 0;

    Tone.loaded().then(() => {
      console.log("All samples loaded.");

      // Randomly play 1-n single notes from a current chord
      new Tone.Loop((time) => {
        // Get current chord.
        const chord = [
          ...chordProgressions[currentChordProgression][currentChord],
        ];

        // Randomize order.
        shuffleArray(chord);

        // Chop chop. Pick 1-n notes from chord.
        const numberOfNotes = Math.round(Math.random() * chord.length);
        const selectedNotes = chord.slice(
          0,
          Math.max(1, numberOfNotes) // Always at least one
        );

        // Play piano notes. Add random delay.
        console.log(`Play piano notes ${selectedNotes.join(", ")}.`);
        selectedNotes.forEach((note, i) => {
          const time = "+0:0:" + (i + Math.round(Math.random() * 4));
          const noteUp = changeOctave(note, 2);
          //   console.log(note + " -> " + noteUp);
          piano.keyDown({
            note: noteUp,
            velocity: 0.5,
            time: time,
          });
          piano.keyUp({ note: noteUp, time: "+5" });
        });
      }, "1n").start(0);

      // Main loop. Start of each bar.
      new Tone.Loop((time) => {
        strings.triggerAttackRelease(
          chordProgressions[currentChordProgression][currentChord],
          "+1n"
        );
        if (currentChord === 2) {
          choir.triggerAttackRelease(
            chordProgressions[currentChordProgression][currentChord][0],
            "+1n"
          );
        }
        currentChord = (currentChord + 1) % 4;
      }, "1n").start(0);

      new Tone.Loop((time) => {
        kick.start();
      }, "1n").start(0);

      forestBirds.start();
      //   const snareLoop = new Tone.Loop((time) => {
      //     snare.start();
      //   }, "1n").start("2n");

      //   const hihatLoop = new Tone.Loop((time) => {
      //     hihat.start();
      //   }, "8n").start(0);

      new Tone.Loop((time) => {
        bowl.start();
      }, "4:0").start(0);

      // the loops start when the Transport is started
      Tone.Transport.bpm.value = 40;
      Tone.Transport.start();
    });
  }
}
