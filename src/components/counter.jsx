import React, { Component } from "react";

class Counter extends Component {
  state = {
    // count:0,
    imageUrl: "https://picsum.photos/200", //generates random image of 200*200 pixels
    tags: ["tag1", "tag2", "tag3"]
  };

  styles = {
    fontSize: 40,
    fontWeight: "bold"
  };

  componentWillMount() {
    // console.log("counter-unmounted");
  }

  render() {
    // console.log("Key: ", this.props.key);
    // console.log("Counter Rendered");
    // let classes = this.getBadgeClasses();
    // console.log("Counter Id",this.props.id);

    // console.log("Check props: ",this.props);

    return (
      <React.Fragment>
        <div className="jumbotron">
          {this.props.children}
          {/* <span> {this.state.count}</span> */}
          {/* <h2 className="badge badge-primary m-2">{this.formatCount()}</h2> */}
          <h2 className={this.getBadgeClasses()}>{this.formatCount()}</h2>
          <button
            onClick={() => {
              this.props.onIncrement(this.props.counter);
              // this.props.calculateCount();

            }}
            className="btn btn-secondary btn-sm"
          >
            Increment
          </button>
          &nbsp;&nbsp;
          <button
            onClick={() => {
              this.props.onDecrement(this.props.counter);
            }}
            className="btn btn-secondary btn-sm"
          >
            Decrement
          </button>
          &nbsp;&nbsp;
          <button
            onClick={() => {
              this.props.onResetOne(this.props.counter);
            }}
            className="btn btn-primary btn-sm-m-2"
          >
            Reset
          </button>
          {/* rendering lists */}
          {/* <ul>
                {this.state.tags.map(tag=><li key={tag}>{tag}</li>)}  */}
          {/* getting a string and mapping it to a jsx exp */}
          {/* </ul> */}
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm-m-2"
          >
            Delete Counter
          </button>
        </div>
      </React.Fragment>
    );
  }

  //we can't have access to "this" means the data of class without making the function arrow function,in normal fn this will return undefined
  //Arrow fn inherits this
  // handleIncrement=()=>{
  //     // console.log("Increment Button Clicked",this);
  //     // console.log('counter: ',this.state.count++);
  //     this.setState({
  //         count:this.state.count+1
  //     });
  // }

  renderTags() {
    if (this.state.tags.length == 0) return <h2>There are no tags!</h2>;
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    //decidiing the bootstarp class based on some condition
    classes =
      this.props.counter.value == 0
        ? "badge badge-warning m-2"
        : "badge badge-primary m-2";
    return classes;
  }

  formatCount() {
    //   const{count}=this.state;
    const { value } = this.props.counter; //object destructuring
    const jsx_exp = <h2>Zero</h2>;
    //   return count==0? "Zero":count;
    return value === 0 ? jsx_exp : value;
  }
}

export default Counter;
