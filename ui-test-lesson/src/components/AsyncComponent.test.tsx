import { render, screen, waitFor } from "@testing-library/react"
import AsyncComponent from "./AsyncComponent"
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("AsyncComponent", () => {
  it("ボタンをクリックすると非同期処理が実行される", async() =>{
    render(<AsyncComponent />)
    expect(screen.getByText("Initial text")).toBeInTheDocument();

    const button = screen.getByRole("button");
    await user.click(button);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    //waitForを用いたテストは実行時間が長くなりがちなので相談の上、対応する。
    await waitFor(()=> {
      expect(screen.getByText("Updated text")).toBeInTheDocument();
    }, {
      interval:50,
      timeout: 3000,
    })
  });

});
