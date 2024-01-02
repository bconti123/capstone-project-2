import backendAPI from "./api";

it("if it is a function?", () => {
    const type = typeof backendAPI;
    expect(type).toEqual("function");
})