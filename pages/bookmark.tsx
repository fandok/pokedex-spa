import { Card, List, Tag, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainMenu from "../components/MainMenu";
import { Bookmark } from "../types/bookmark";

const BookmarkPage = () => {
  const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes("pokemon")) {
        const item = localStorage.getItem(key) || "";
        arr.push(JSON.parse(item));
      }
    }

    setBookmarkList(arr);
  }, []);

  return (
    <>
      <MainMenu />
      <Typography.Title>My Bookmark</Typography.Title>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={bookmarkList}
        renderItem={(item) => (
          <List.Item>
            <Link href={`/${item.name}`}>
              <Card bordered>
                <Image
                  alt="pokemon picture"
                  src={item.frontSource}
                  width={150}
                  height={100}
                />
                <div>{item.name}</div>
                {item.types.map((type) => (
                  <Tag key={type.type.name}>{type.type.name}</Tag>
                ))}
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default BookmarkPage;
