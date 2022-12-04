import { Button, Descriptions, Divider, message, Tag, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import MainMenu from "../components/MainMenu";
import { fetcher, POKEMON_LIST_API } from "../constants";
import { PokemonDetailResponse } from "../types/id";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    const enabled = localStorage.getItem(`pokemon-${id}`);
    setDisabled(!Boolean(enabled));
  }, [id]);

  const { data } = useSWR<PokemonDetailResponse>(
    id ? `${POKEMON_LIST_API}/${id}` : null,
    fetcher
  );

  const frontSource = data?.sprites.other.dream_world.front_default || "";
  const types = data?.types || [];
  const stats = data?.stats || [];
  const name = data?.name || "";

  const handleSaveBookMark = () => {
    const savedData = {
      name,
      types,
      frontSource,
    };

    localStorage.setItem(`pokemon-${name}`, JSON.stringify(savedData));

    setDisabled(true);
    message.success("Bookmarked!");
  };

  return (
    <>
      <MainMenu />
      <Typography.Title>{name}</Typography.Title>

      <Image alt="pokemon picture" src={frontSource} width={226} height={218} />

      <Divider />
      <Button disabled={!isDisabled} onClick={handleSaveBookMark}>
        Bookmark?
      </Button>

      <Typography.Title level={4}>Stats</Typography.Title>
      <Descriptions bordered>
        {stats.map((stat) => (
          <Descriptions.Item key={stat.stat.name} label={stat.stat.name}>
            {stat.base_stat}
          </Descriptions.Item>
        ))}
      </Descriptions>

      <Typography.Title level={4}>Types</Typography.Title>
      {types.map((type) => (
        <Tag key={type.type.name}>{type.type.name}</Tag>
      ))}
    </>
  );
};

export default Detail;
