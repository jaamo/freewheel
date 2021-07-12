/**
 * Move note string up with one octave. Basically this
 * function increases numbers in string by one.
 */
export const changeOctave = (note: string, octaveChange: number): string => {
  for (let i = 1; i < 9; i++) {
    if (note.indexOf(i.toString()) !== -1) {
      return note.replaceAll(`${i}`, `${i + octaveChange}`);
    }
  }
  return note;
};
