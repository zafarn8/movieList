
import React from "react";
import { shallow } from "enzyme";
import FilterSortControls from "../FilterSortControls";  

describe("FilterSortControls Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<FilterSortControls searchTerm="" setSearchTerm={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("calls setSearchTerm on input change", () => {
    const mockSetSearchTerm = jest.fn();
    const wrapper = shallow(<FilterSortControls searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const input = wrapper.find("input");

    input.simulate("change", { target: { value: "test" } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith("test");
  });
});
