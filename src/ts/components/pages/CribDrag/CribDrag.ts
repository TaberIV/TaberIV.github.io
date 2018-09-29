import { sha256 } from "js-sha256";

class CribDrag {
  public static hexToOrd(cipherText: string) {
    const chars: number[] = [];

    for (let i = 0; i < cipherText.length - 1; i += 2) {
      const hex = cipherText.substr(i, 2);
      chars.push(parseInt(hex, 16));
    }

    return chars;
  }

  public static hexToString(cipherText: string) {
    return this.ordsToString(this.hexToOrd(cipherText));
  }

  public static ordsToHex(ords: number[]) {
    return ords.reduce<string>((prev, curr) => prev + curr.toString(16), "");
  }

  public static ordsToString(ords: number[]) {
    const standIn = "-".charCodeAt(0);
    const printSafeOrds = ords.map(ord => (ord <= 32 ? standIn : ord));

    return String.fromCharCode(...printSafeOrds);
  }

  public static stringToOrds(text: string) {
    return text.split("").map(char => char.charCodeAt(0));
  }

  public static stringToHex(text: string) {
    return this.ordsToHex(this.stringToOrds(text));
  }

  public static xorNumLists(cipher1: number[], cipher2: number[]) {
    return cipher1.map((ord, i) => ord ^ cipher2[i]);
  }

  public static xorGuess(cipherText: number[], guess: number[], index: number) {
    let plainText = "";
    let valid = true;

    for (let j = 0; j < guess.length && valid; j++) {
      const char = guess[j];
      const xor = char ^ cipherText[index + j];
      plainText += String.fromCharCode(xor);

      valid =
        (xor >= "A".charCodeAt(0) && xor <= "Z".charCodeAt(0)) ||
        (xor >= "a".charCodeAt(0) && xor <= "z".charCodeAt(0)) ||
        xor === " ".charCodeAt(0);
    }

    return { plainText, valid };
  }

  public static cribDrag(cipherTexts: string[], guess: string) {
    const cipherOrds = cipherTexts.map(this.hexToOrd);
    const guessOrds = this.stringToOrds(guess);

    const textsSets: Array<{ plainTexts: string[]; index: number }> = [];
    for (let i = 0; i < cipherOrds.length; i++) {
      const textsSet: Array<{ plainTexts: string[]; index: number }> = [];
      for (
        let charIndex = 0;
        charIndex <= cipherOrds[0].length - guessOrds.length;
        charIndex++
      ) {
        const plainTexts: string[] = [];
        let validThru = true;

        for (let j = 0; j < cipherOrds.length; j++) {
          if (i !== j) {
            const xorcipher = this.xorNumLists(cipherOrds[i], cipherOrds[j]);
            const { plainText, valid } = this.xorGuess(
              xorcipher,
              guessOrds,
              charIndex
            );

            if (!valid) {
              validThru = valid;
              break;
            }

            plainTexts.push(plainText);
          } else {
            plainTexts.push(guess);
          }
        }
        // plainTexts.length === cipherTexts.length - 1
        if (validThru) {
          textsSet.push({ plainTexts, index: charIndex });
        }
      }

      textsSet.forEach(text => textsSets.push(text));
    }

    return textsSets;
  }

  public static getKey(cipherText: string, plainText: string) {
    return this.xorNumLists(
      this.hexToOrd(cipherText),
      this.stringToOrds(plainText)
    );
  }

  public static nextKey(key: string, n?: number) {
    for (let i = 0; i < (n ? n : 1); i++) {
      key = this.hexToString(sha256(key)) + "\x21";
    }

    return key;
  }
}

export default CribDrag;
