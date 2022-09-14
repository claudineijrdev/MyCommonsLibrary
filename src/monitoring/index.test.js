
describe("Monitoring", () => {
  it("it shold exports console monitoring object", () => {
    const {Console} = require("./index");
    expect(Console).toBeDefined();
  });
});