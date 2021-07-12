import * as Tone from "tone";
import { Sampler } from "tone";
import { Instrument } from "./Instrument";

export class PadInstrument implements Instrument {
  choir: Sampler | null;
  horns: Sampler | null;
  constructor() {
    this.choir = null;
    this.horns = null;
  }
  load() {
    this.choir = new Tone.Sampler({
      urls: {
        C2: "C2.mp3",
        "C#2": "Cs2.mp3",
        D2: "D2.mp3",
        "D#2": "Ds2.mp3",
        E2: "E2.mp3",
        F2: "F2.mp3",
        "F#2": "Fs2.mp3",
        G2: "G2.mp3",
        "G#2": "Gs2.mp3",
        A2: "A2.mp3",
        "A#2": "As2.mp3",
        B2: "B2.mp3",
      },
      release: 1,
      baseUrl: "/samples/strings/male-choir/",
    }).toDestination();
    this.choir.volume.value = -16;

    this.horns = new Tone.Sampler({
      urls: {
        C2: "C2.mp3",
        "C#2": "Cs2.mp3",
        D2: "D2.mp3",
        "D#2": "Ds2.mp3",
        E2: "E2.mp3",
        F2: "F2.mp3",
        "F#2": "Fs2.mp3",
        G2: "G2.mp3",
        "G#2": "Gs2.mp3",
        A2: "A2.mp3",
        "A#2": "As2.mp3",
        B2: "B2.mp3",
      },
      release: 1,
      baseUrl: "/samples/strings/horn/",
    }).toDestination();
    this.horns.volume.value = -16;
  }
  trigger(note: string) {
    this.horns?.triggerAttackRelease(note, "+1n");
  }
}
