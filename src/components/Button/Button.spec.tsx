import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Button } from ".";

describe("Button test", () => {
	it("should render Button correctly", () => {
		const { getByText } = render(<Button>test</Button>);
		const element = getByText("test");
		expect(element).toBeInTheDocument();
	});

	it("should render Button with primary variant", () => {
		const { getByRole } = render(<Button variant="primary">test</Button>);
		const element = getByRole("button");
		expect(element).toHaveClass("bg-blue-500 border-blue-500");
	});

	it("should render Button with outlined variant", () => {
		const { getByRole } = render(<Button variant="outlined">test</Button>);
		const element = getByRole("button");
		expect(element).toHaveClass("bg-white text-gray-500 border-gray-300");
	});
	it("should render Button with outlined variant", () => {
		const { getByRole } = render(<Button variant="secondary">test</Button>);
		const element = getByRole("button");
		expect(element).toHaveClass("bg-blue-900 border-blue-900");
	});
});
