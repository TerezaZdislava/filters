import { customers } from "../src/api/customers";
import { createFilters } from "../src/filters";

describe("customers", () => {
  it("19 customers", () => {
    expect(customers.length).toEqual(19);
  });
});

describe("filters", () => {
  it("createFilters ", () => {
    expect(createFilters()).toEqual([]);
  });
});
