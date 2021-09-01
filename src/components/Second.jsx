import React from "react";

class ShowProp extends React.Component {
  render() {
    return (
      <div>
        <h3>
          <b>Name:</b> {this.props.student.name}
        </h3>
        <h3>
          <b>Roll_no:</b> {this.props.student.Roll_no}
        </h3>
      </div>
    );
  }
}
class Second extends React.Component {
  state = {
    course: "Mca"
  };
  changeCourse = () => {
    //   console.log(typeof(this.course));
    if (this.state.course == "Mca") {
      this.setState({
        course: "M.sc"
      });
    } else
      this.setState({
        course: "Mca"
      });
  };
  render() {
    const student = { name: "Reena Garg", Roll_no: 29 };
    return (
      <div>
        <h1>Student's Details:</h1>
        <ShowProp student={student} />
        <h3>
          <b>Course:</b> {this.state.course}
        </h3>
        <button onClick={this.changeCourse}>Change Course</button>
      </div>
    );
  }
}
export default Second;
