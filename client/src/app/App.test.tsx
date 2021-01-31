import React, { lazy, Suspense } from "react";
import { shallow, render, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { MemoryRouter, Route } from "react-router-dom";
import App from ".";
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import Register from "../pages/Register";
import PageNotFound from "../pages/PageNotFound";
// const PageNotFound = lazy(() => import("../pages/PageNotFound"));
import { act } from "react-dom/test-utils";

const wrapper = shallow<typeof App>(<App />);
const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve));
    wrapper.update();
  });
};

jest.mock("react", () => {
  const React = jest.requireActual("react");
  const Suspense = ({ children }) => {
    return children;
  };

  const lazy = jest.fn().mockImplementation((fn) => {
    const Component = (props) => {
      const [C, setC] = React.useState();

      React.useEffect(() => {
        fn().then((v) => {
          setC(v);
        });
      }, []);

      return C ? <C.default {...props} /> : null;
    };

    return Component;
  });

  return {
    ...React,
    lazy,
    Suspense,
  };
});

// Mocked user
const user = {
  name: "Adeneye David",
  email: "david@gmail.com",
  username: "Dave",
};

describe("App", () => {
  // Check to have no errors
  it("renders without crashing", () => {
    wrapper;
  });

  // Check if render successfully App Header and Footer
  it("renders Header and Footer", () => {
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
    expect(wrapper.containsAllMatchingElements([<Header key="1" />, <Footer key="2" />])).toEqual(true);
  });

  // Check if render successfully App Header and Footer
  it("renders Header and Footer", async () => {
    // Act
    const test = mount(
      <MemoryRouter initialEntries={["/random"]}>
        <App />
      </MemoryRouter>,
    );

    await waitForComponentToPaint(wrapper);
    console.log(test);
    // expect(wrapper.find(LandingPage)).toHaveLength(0);
    // expect(test.find(Register)).toHaveLength(1);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(test.exists(PageNotFound)).toEqual(true);

    // const routeWrapper = render(
    //   <MemoryRouter initialEntries={["/register"]}>
    //     <App />
    //   </MemoryRouter>,
    // );

    // console.log(routeWrapper);
    // Assert
    // expect(routeWrapper.find(Register)).toHaveLength(1);
    // expect(routeWrapper.containsMatchingElement(<Register />)).toEqual(true);
  });

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
  it("passes snapshot", () => {
    const tree = shallow(<App />);
    expect(toJson(tree)).toMatchSnapshot();
  });
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
