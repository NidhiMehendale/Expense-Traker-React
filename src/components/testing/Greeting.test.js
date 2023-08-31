import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test("renders hello world as a text", () => {
    //Arrange
    render(<Greeting />);

    //Act
    

    //assesrert
    const helloworldElement = screen.getByText("Hello World!");
    expect(helloworldElement).toBeInTheDocument();
});