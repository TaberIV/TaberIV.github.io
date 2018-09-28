class CypherFunctions {
  public static hexToOrd(cypherText: string) {
    const chars: number[] = [];

    for (let i = 0; i < cypherText.length - 1; i += 2) {
      const hex = cypherText.substr(i, 2);
      chars.push(parseInt(hex, 16));
    }

    return chars;
  }

  public static ordsToString(ords: number[]) {
    const standIn = "-".charCodeAt(0);
    const printSafeOrds = ords.map(ord => (ord <= 32 ? standIn : ord));

    return String.fromCharCode(...printSafeOrds);
  }

  public static xorCyphers(cypher1: number[], cypher2: number[]) {
    return cypher1.map((ord, i) => ord ^ cypher2[i]);
  }

  public static xorGuess(cypherText: number[], guess: number[], index: number) {
    let plainText = "";
    let valid = true;

    for (let j = 0; j < guess.length && valid; j++) {
      const char = guess[j];
      const xor = char ^ cypherText[index + j];
      plainText += String.fromCharCode(xor);

      valid =
        (xor >= "A".charCodeAt(0) && xor <= "Z".charCodeAt(0)) ||
        (xor >= "a".charCodeAt(0) && xor <= "z".charCodeAt(0)) ||
        xor === " ".charCodeAt(0);
    }

    return { plainText, valid };
  }

  public static cribDrag(cypherTexts: string[], guess: string) {
    const cypherOrds = cypherTexts.map(this.hexToOrd);
    const guessOrds = guess.split("").map(char => char.charCodeAt(0));

    const textsSets: Array<{ plainTexts: string[]; index: number }> = [];
    for (let i = 0; i < cypherOrds.length; i++) {
      const textsSet: Array<{ plainTexts: string[]; index: number }> = [];
      for (
        let charIndex = 0;
        charIndex <= cypherOrds[0].length - guessOrds.length;
        charIndex++
      ) {
        const plainTexts: string[] = [];
        let validThru = true;

        for (let j = 0; j < cypherOrds.length; j++) {
          if (i !== j) {
            const xorCypher = this.xorCyphers(cypherOrds[i], cypherOrds[j]);
            const { plainText, valid } = this.xorGuess(
              xorCypher,
              guessOrds,
              charIndex
            );

            if (!valid) {
              validThru = valid;
              break;
            }

            plainTexts.push(plainText);
          }
        }
        // plainTexts.length === cypherTexts.length - 1
        if (validThru) {
          textsSet.push({ plainTexts, index: charIndex });
        }
      }

      textsSet.forEach(text => textsSets.push(text));
    }

    console.log(textsSets);
    return textsSets;
  }
}

export default CypherFunctions;
