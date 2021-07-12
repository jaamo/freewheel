export interface Instrument {
  load(): void;
  trigger(note: string): void;
}
