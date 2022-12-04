import { MenuProps } from "antd";
import Link from "next/link";

export const POKEMON_LIST_API = "https://pokeapi.co/api/v2/pokemon";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const MENU_ITEMS: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "home",
  },
  {
    label: <Link href="/bookmark">My Bookmark</Link>,
    key: "my bookmark",
  },
];
