import { Button, Card, List, Typography } from "antd";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, POKEMON_LIST_API } from "../constants";
import { PokemonListResponse, Result } from "../types";

const DEFAULT_OFFSET = 20;

export default function Home() {
  const [dataSource, setDataSource] = useState<Result[]>([]);
  const [page, setPage] = useState(1);

  const { data } = useSWR<PokemonListResponse>(
    `${POKEMON_LIST_API}?offset=${(page - 1) * DEFAULT_OFFSET}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const pokemonData = data?.results || [];
      setDataSource((prev) => [...prev, ...pokemonData]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const isNext = data?.next || "";

  return (
    <>
      <Typography.Title>Pokemon Page with Ant Design</Typography.Title>
      <List
        loadMore={
          isNext && (
            <div style={{ textAlign: "center" }}>
              <Button onClick={handleLoadMore}>Load More</Button>
            </div>
          )
        }
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <Card bordered>{item.name}</Card>
          </List.Item>
        )}
      />
    </>
  );
}
