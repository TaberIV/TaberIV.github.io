class CypherFunctions {
  public static cypherTextToNumbers(cypherText: string) {
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

  public static cribDrag(cypherText: number[], guess: string) {
    const crib = guess.split("").map(char => char.charCodeAt(0));
    const plainTexts: Array<{ plainText: string; index: number }> = [];

    for (let index = 0; index <= cypherText.length - crib.length + 1; index++) {
      let plainText = "";
      let valid = true;

      for (let j = 0; j < crib.length && valid; j++) {
        const char = crib[j];
        const xor = char ^ cypherText[index + j];
        plainText += String.fromCharCode(xor);

        valid =
          (xor >= "A".charCodeAt(0) && xor <= "Z".charCodeAt(0)) ||
          (xor >= "a".charCodeAt(0) && xor <= "z".charCodeAt(0)) ||
          xor === " ".charCodeAt(0);
      }

      if (valid) {
        plainTexts.push({ plainText, index });
      }
    }

    return plainTexts;
  }
}

export default CypherFunctions;
