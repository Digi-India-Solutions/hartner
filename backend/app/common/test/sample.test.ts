import { describe, it, expect } from "vitest";

describe("Sample Unit Test", () => {
  it("should perform addition correctly", () => {
    expect(1 + 1).toBe(2);
  });

  it("should perform string operations correctly", () => {
    const message = "hello world";
    expect(message).toContain("hello");
  });
});
