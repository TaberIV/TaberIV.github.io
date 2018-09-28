import React, { Component } from "react";

interface CribCalcState {
  guess: string;
  cypherTexts: string;
}

class CribDragCalc extends Component<{}, CribCalcState> {
  public static cribDrag(messages: string[], guess: string) {
    const matches: string[] = [];

    messages.forEach(message => {
      for (let i = 0; i <= message.length - guess.length; i++) {
        // const text = "";
      }
    });

    return matches;
  }

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

  // public static xorCypherTexts(cypherTexts: string[]) {
  //   cypherTexts.map(() => {
  //     cypherTexts
  //   })
  // }

  constructor(props: {}) {
    super(props);

    this.state = {
      cypherTexts:
        "2d0a0612061b0944000d161f0c1746430c0f0952181b004c1311080b4e07494852\
\n200a054626550d051a48170e041d011a001b470204061309020005164e15484f44\
\n3818101500180b441b06004b11104c064f1e0616411d064c161b1b04071d460101\
\n200e0c4618104e071506450604124443091b09520e125522081f061c4e1d4e5601\
\n304f1d091f104e0a1b48161f101d440d1b4e04130f5407090010491b061a520101\
\n2d0714124f020111180c450900595016061a02520419170d1306081c1d1a4f4601\
\n351a160d061917443b3c354b0c0a01130a1c01170200191541070c0c1b01440101\
\n3d0611081b55200d1f07164b161858431b0602000454020d1254084f0d12554249\
\n340e0c040a550c1100482c4b0110450d1b4e1713185414181511071b071c4f0101\
\n2e0a5515071a1b081048170e04154d1a4f020e0115111b4c151b492107184e5201\
\n370e1d4618104e05060d450f0a104f044f080e1c04540205151c061a1a5349484c",
      guess: ""
    } as CribCalcState;
  }

  public handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "guess") {
      this.setState({ guess: value });
    } else if (name === "messages") {
      this.setState({ cypherTexts: value });
    } else {
      throw new Error(`${name} is not an expected field.`);
    }
  };

  public handleSubmit = (e: any) => {
    e.preventDefault();
  };

  public render() {
    const cypherTexts = this.state.cypherTexts.split("\n");
    const [cypherOrd1, ...cypherOrd] = cypherTexts.map(
      CribDragCalc.cypherTextToNumbers
    );
    const xorCyphers = cypherOrd.map(cypher =>
      cypher.map((ord, i) => ord ^ cypherOrd1[i])
    );
    const cypherStrings = xorCyphers.map(CribDragCalc.ordsToString);

    // const xoredCypherTexts = CribDragCalc.xorCypherTexts(cypherTextsList);

    return (
      <div className="cribDragCalc">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="messagesInput">
            <p>Message Cypher Texts: (Separate with newline)</p>
            <textarea
              id="messagesInput"
              name="messages"
              value={this.state.cypherTexts}
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="guessInput">
            Guess:
            <input
              type="text"
              id="guessInput"
              name="guess"
              onChange={this.handleChange}
            />
          </label>
        </form>

        <div className="cribDragCalc__results">
          {cypherStrings.map((cypherText, i) => (
            <p key={i}>{cypherText}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default CribDragCalc;
