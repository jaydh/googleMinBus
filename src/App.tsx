import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

class App extends Component<
  {},
  { n: number; pop: number[]; people: number[]; distances: number[] }
> {
  constructor(props: {}) {
    super(props);
    const n = 50;
    this.state = {
      n,
      pop: this.getData(n),
      people: this.getPeople(n),
      distances: this.getDistances(n)
    };
  }

  componentDidUpdate(oldProps: {}, oldState: any) {
    if (oldState.n !== this.state.n) {
      const n = this.state.n;
      this.setState({
        pop: this.getData(n),
        people: this.getPeople(n),
        distances: this.getDistances(n)
      });
    }
  }
  render() {
    const { n, pop, distances, people } = this.state;

    //integral of f(x) = x
    const area = Math.pow(n, 2) / 2;
    const target = area / 2;
    // solve for upper bound where integral = target
    const bound = Math.sqrt(2 * target);

    const data = {
      labels: Array.from(pop.keys()),
      datasets: [
        {
          type: 'bar',
          label: 'People Growth Distribution',
          data: pop,
          borderColor: '#EC932F',
          backgroundColor: '#EC932F',
          pointBorderColor: '#EC932F',
          pointBackgroundColor: '#EC932F',
          pointHoverBackgroundColor: '#EC932F',
          pointHoverBorderColor: '#EC932F'
        }
      ]
    };
    const data2 = {
      labels: Array.from(pop.keys()),
      datasets: [
        {
          label: 'Accumulated Population at x',
          type: 'bar',
          data: people,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C'
        }
      ]
    };
    const data3 = {
      labels: Array.from(pop.keys()),
      datasets: [
        {
          label: 'brute force distances',
          type: 'line',
          data: distances,
          backgroundColor: '#71B37C',
          borderColor: '#71B37C',
          hoverBackgroundColor: '#71B37C',
          hoverBorderColor: '#71B37C'
        }
      ]
    };

    return (
      <div>
        <p>
          Problem stataement: for n blocks where at each block m there are m
          people, find a point between 1 and n where the average distance needed
          to travel by people is minimized{' '}
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            N:
            <input type="text" value={n} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>
          Upperbound of integral to halve area under curve of first graph
          (Population Growth Per x) : {bound}
        </p>
        <Bar data={data} width={600} height={250} />
        <Bar data={data2} width={600} height={250} />
        <Line data={data3} width={600} height={250} />
      </div>
    );
  }

  private handleChange = (e: any) =>
    this.setState({ n: Number(e.target.value) });
  private handleSubmit = (e: any) => e.preventDefault();

  private getData = (n: number) => Array.from(Array(n).keys());
  private getPeople = (n: number) =>
    Array.from(Array(n).keys()).map((n: number) => (n * (n + 1)) / 2);
  private getDistances = (n: number) => {
    const res = [];
    for (let i = 0; i < n; i++) {
      res.push(this.getDistanceFromN(i, n));
    }
    return res;
  };
  private getDistanceFromN = (stop: number, n: number) => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum = Math.abs(i * (stop - i)) + sum;
    }
    return sum;
  };
}

export default App;
