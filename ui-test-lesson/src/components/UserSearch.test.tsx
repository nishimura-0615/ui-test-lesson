/**
 * 演習
 * 次の内容でテストを作成してください
 * 1. 入力フィールドに値を入力し、検索ボタンをクリックすると適切なAPIリクエストが発生する
 * 2. APIから取得したユーザー情報が正しく画面に表示される
 */

import { render, screen,waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { UserSearch } from "./UserSearch";

jest.mock("axios");
const mockAxios = jest.mocked(axios);

describe("UserSearch", () => {
  beforeEach(()=> {
    mockAxios.get.mockReset();
  });
  it("入力フォームに入力した内容でAPIリクエストが送信される", async() => {
    const userInfo = {
      id:1,
      name:"Taro"
    };
    const resp = { data: userInfo };
    mockAxios.get.mockResolvedValue(resp);

    render(<UserSearch />)

    const input = screen.getByRole("textbox");
    await userEvent.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `/api/users?query=${userInfo.name}`
    )
  })

  it("APIから取得するユーザー情報が画面に表示される", async() => {
    const userInfo = {
      id:1,
      name:"Taro"
    };
    const resp = { data: userInfo };
    mockAxios.get.mockResolvedValue(resp);

    render(<UserSearch />)

    const input = screen.getByRole("textbox");
    await userEvent.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    await waitFor(() => expect(screen.getByText(userInfo.name)).toBeInTheDocument())

  });

})
