import React from "react";
import { shallow, mount } from "enzyme";
import { toJson } from "enzyme-to-json";
import App from "./App";

// Mocked user
const user = {
  name: "Adeneye David",
  email: "david@gmail.com",
  username: "Dave",
};

describe("App", () => {
  // Check to have no errors
  it("renders without crashing", () => {
    shallow(<App />);
  });

  // Check if render successfully App header
  // it("renders Account header", () => {
  //   const wrapper = shallow(<App />);
  //   const header = <h1>Display Active Users Account Details</h1>;
  //   expect(wrapper.contains(header)).toEqual(true);
  // });

  // // Check props with mocked data
  // it("accepts user account props", () => {
  //   const wrapper = mount(<App user={user} />);
  //   expect(wrapper.props().user).toEqual(user);
  // });

  // // Check element to have specific mocked value
  // it("contains users account email", () => {
  //   const wrapper = mount(<App user={user} />);
  //   const value = wrapper.find("p").text();
  //   expect(value).toEqual("david@gmail.com");
  // });

  // // Check for state errors
  // it("renders correctly with no error message", () => {
  //   const wrapper = mount(<App />);
  //   expect(wrapper.state("error")).toEqual(null);
  // });

  // // Create snapshot
  // it("renders correctly", () => {
  //   const tree = shallow(<App />);
  //   expect(toJson(tree)).toMatchSnapshot();
  // });
});

// describe("App", () => {
//   let wrapper;

//   beforeEach(() => (wrapper = shallow(<App />)));

//   it("should render a <div />", () => {
//     expect(wrapper.find("div").length).toEqual(1);
//   });

//   it("should render the Calculator Component", () => {
//     expect(wrapper.containsMatchingElement(<Calculator />)).toEqual(true);
//   });
// });
