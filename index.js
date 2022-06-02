class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expression: "",
      operation: "0",
    };
    this.reset = this.reset.bind(this);
    this.addToExpression = this.addToExpression.bind(this);
    this.calculateExpression = this.calculateExpression.bind(this);
  }

  addToExpression(e) {
    if (e.target.className === "numbers") {
      if (this.state.expression.includes("=")) {
        this.setState({
          expression: e.target.innerText == "." ? "0." : e.target.innerText,
          operation: e.target.innerText == "." ? "0." : e.target.innerText,
        });
      } else {
        if (
          (this.state.operation === "0" || !parseInt(this.state.operation)) &&
          e.target.innerText !== "."
        ) {
          this.setState((prevState) => ({
            expression: prevState.expression + e.target.innerText,
            operation: e.target.innerText,
          }));
        } else {
          this.setState((prevState) => ({
            expression: prevState.expression + e.target.innerText,
            operation: prevState.operation + e.target.innerText,
          }));
        }
      }
    }

    if (e.target.className === "operations") {
      if (this.state.expression.includes("=")) {
        this.setState((prevState) => ({
          expression: prevState.operation + e.target.innerText,
          operation: e.target.innerText,
        }));
      } else {
        this.setState((prevState) => ({
          expression: prevState.expression + e.target.innerText,
          operation: e.target.innerText,
        }));
      }
    }
  }

  reset() {
    this.setState({
      expression: "",
      result: "",
      operation: "",
    });
  }

  calculateExpression() {
    let expression = this.state.expression;
    let result = eval(expression);
    this.setState((prevState) => ({
      expression: prevState.expression + "=" + result,
      operation: result,
    }));
  }

  render() {
    return (
      <table>
        <thead>
          <tr className="expression-cover">
            <th className="expression" colSpan="4">
              {this.state.expression || (
                <div className="hidden-element">expression</div>
              )}
            </th>
          </tr>
          <tr>
            <th colSpan="4">
              {this.state.operation ? this.state.operation : "0"}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td onClick={this.reset}>AC</td>
            <td>MC</td>
            <td className="operations" onClick={(e) => this.addToExpression(e)}>
              %
            </td>
            <td className="operations" onClick={(e) => this.addToExpression(e)}>
              /
            </td>
          </tr>
          <tr>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              7
            </td>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              8
            </td>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              9
            </td>
            <td className="operations" onClick={(e) => this.addToExpression(e)}>
              *
            </td>
          </tr>
          <tr>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              4
            </td>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              5
            </td>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              6
            </td>
            <td className="operations" onClick={(e) => this.addToExpression(e)}>
              -
            </td>
          </tr>
          <tr>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              1
            </td>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              2
            </td>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              3
            </td>
            <td className="operations" onClick={(e) => this.addToExpression(e)}>
              +
            </td>
          </tr>
          <tr>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              0
            </td>
            <td className="numbers" onClick={(e) => this.addToExpression(e)}>
              .
            </td>
            <td
              colSpan="2"
              className="operations"
              onClick={this.calculateExpression}
            >
              =
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Calculator />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
