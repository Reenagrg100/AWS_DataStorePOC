import React from "react";
import Counter from "./counter";

class Counters extends React.Component {
  styles = {
    fontSize: 40,
    fontWeight: "bold"
  };

  state = {
    counters: [
      {
        id: 1,
        value: 0
      },
      {
        id: 2,
        value: 0
      },
      {
        id: 3,
        value: 0
      },
      {
        id: 4,
        value: 0
      }
    ],
    totalCount:''
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log("Counter: ");
    // console.log("PrevProps", prevProps);
    // console.log("PrevState", prevState);
  }

  calculateIncrementedCount=()=>{
    const incCounters = this.state.counters.filter(c => c.value > 0).length;
    this.props.calculateIncrementedCount(incCounters);
  }


  // ...............................................
  handleIncrement = counter => {
    // console.log("Clicked counter: ", counter);
    const counters = [...this.state.counters];
    // console.log("copy counters: ",copy_counters);

    const index = this.state.counters.indexOf(counter);
    // console.log("Index: ", index);
    counters[index].value++;
    this.setState({ counters });

    this.calculateIncrementedCount();
    
    // console.log("Final:", counters);
    // console.log(counters[0]);
    // console.log(new_value);
    // console.log(counters[0].value);
  };

  // ...............................................

  handleDecrement = counter => {
    // console.log("Clicked counter: ",counter);
    const counters = [...this.state.counters];
    // console.log("copy counters: ",copy_counters);

    const index = this.state.counters.indexOf(counter);
    // console.log("Index: ", index);
    if (counters[index].value > 0) {
      counters[index].value--;
      this.setState({ counters });
    }

    console.log("Final:", counters);
    this.calculateIncrementedCount();

  };
  // ...............................................

  handleResetOne = counter => {
    // console.log("Clicked counter: ",counter);
    const counters = [...this.state.counters];
    // console.log("copy counters: ",copy_counters);

    const index = this.state.counters.indexOf(counter);
    console.log("Index: ", index);
    if (counters[index].value > 0) {
      counters[index].value = 0;
      this.setState({ counters });
    }

    console.log("Final:", counters);
    this.calculateIncrementedCount();

  };

  // ...............................................
  handleDelete = counterId => {
    // console.log("Delete event handler called",counterId);
    const counters = this.state.counters.filter(c => c.id != counterId);
    console.log("Counters  after delete", counters);
    this.setState({ counters });
    const totalCount=counters.length;
    this.setState({totalCount:totalCount});
    //handling total counters

    this.props.calculateTotalCount(totalCount);

    this.calculateIncrementedCount();

    
  };

  // ...............................................
  handleResetAll = () => {
    const counters = this.state.counters.map(c => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
    console.log(counters);

    this.calculateIncrementedCount();

  };
  

  render() {
  
    //handling total counters
    // console.log("Counters rendered");
    // const {onIncrement,onDecrement,onDelete,onResetOne,onResetAll,counters}=this.props;
    return (
      <div
        onLoad={() => {
          console.log("on load");
          this.props.CalculateCount(this.state.counters);
        }}
      >
        <h1 style={this.styles}>Counter React app!!</h1>
        <br></br>

        <button
          onClick={this.handleResetAll}
          className="btn btn-primary btn-sm-m-2"
        >
          Reset All{" "}
        </button>

        {this.state.counters.map(counter => (
          <Counter
            key={counter.id} //key attribute is used interbally by react .can't get it
            // id={counter.id}
            // value={counter.value}
            counter={counter}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onResetOne={this.handleResetOne}
            calculateCount={this.props.calculateCount}
          >
            <h4>Title: Counter #{counter.id}</h4>
          </Counter>
        ))}
      </div>
    );
  }
}
export default Counters;
