import backendAPI from "../../helper/api";

it("backendAPI", () => {
    expect(backendAPI).toBeDefined();
    expect(backendAPI).not.toBeNull();
    expect(backendAPI).not.toBeUndefined();

    expect(backendAPI.request).toBeDefined();
    expect(backendAPI.request).not.toBeNull();
    expect(backendAPI.request).not.toBeUndefined();
})

