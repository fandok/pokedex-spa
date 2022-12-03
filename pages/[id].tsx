import {
  Breadcrumb,
  Button,
  Descriptions,
  Layout,
  Tag,
  Typography,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher, POKEMON_LIST_API } from "../constants";
import { PokemonDetailResponse } from "../types/id";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

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
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{name}</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title>{name}</Typography.Title>

      <Image alt="pokemon picture" src={frontSource} width={226} height={218} />

      <Button onClick={handleSaveBookMark}>Bookmark?</Button>

      <Descriptions bordered>
        {stats.map((stat) => (
          <Descriptions.Item key={stat.stat.name} label={stat.stat.name}>
            {stat.base_stat}
          </Descriptions.Item>
        ))}
      </Descriptions>

      {types.map((type) => (
        <Tag key={type.type.name}>{type.type.name}</Tag>
      ))}
    </>
  );
};

export default Detail;
