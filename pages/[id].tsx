import { Typography } from "antd";
import Image from "next/image";
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

  return (
    <>
      <Typography.Title>{data?.name}</Typography.Title>
      <Image alt="pokemon picture" src={frontSource} width={226} height={218} />
      {stats.map((stat) => (
        <div key={stat.stat.name}>
          {stat.stat.name} {stat.base_stat}
        </div>
      ))}
      {types.map((type) => (
        <div key={type.slot}>{type.type.name}</div>
      ))}
    </>
  );
};

export default Detail;
