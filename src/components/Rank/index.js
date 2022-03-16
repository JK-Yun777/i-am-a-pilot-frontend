import React, { useRef, Suspense, useState, useEffect } from "react";

import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

import { getRankList } from "../../api";

function RankList(props) {
  const ref = useRef();
  const { yinitial, yPosition, text } = props;

  useFrame((state) => {
    let t = state.clock.getElapsedTime() + 4;
    ref.current.position.x = 0;
    ref.current.position.x = 0;
    ref.current.position.y = yinitial;
    ref.current.position.y = ref.current.position.y + t;

    if (ref.current.position.y > yPosition) {
      t = 0;
      ref.current.position.y = yPosition;
    }
  });

  return (
    <mesh castShadow ref={ref}>
      <Text anchorX="center" anchorY="middle" scale={15}>
        {text}
      </Text>
    </mesh>
  );
}

function Rank() {
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [rankingList, setRankList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRankList();

        setRankList(response.data.rankList);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
    console.log("rankingList>>>>>", rankingList);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setOne(true), 1000);
    const t2 = setTimeout(() => setTwo(true), 2000);
    const t3 = setTimeout(() => setThree(true), 3000);
    const t4 = setTimeout(() => setFour(true), 4000);
    const t5 = setTimeout(() => setFive(true), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <Suspense fallback={null}>
      {one && (
        <RankList
          yinitial={-18}
          yPosition={2}
          text={`1. ${rankingList[0].email} | Distance ${rankingList[0].distance}`}
        />
      )}
      {two && (
        <RankList
          yinitial={-21}
          yPosition={-1}
          text={`2. ${rankingList[1].email} | Distance ${rankingList[1].distance}`}
        />
      )}
      {three && (
        <RankList
          yinitial={-24}
          yPosition={-4}
          text={`3. ${rankingList[2].email} | Distance ${rankingList[2].distance}`}
        />
      )}
      {four && (
        <RankList
          yinitial={-27}
          yPosition={-7}
          text={`4. ${rankingList[3].email} | Distance ${rankingList[3].distance}`}
        />
      )}
      {five && (
        <RankList
          yinitial={-30}
          yPosition={-10}
          text={`5. ${rankingList[4].email} | Distance ${rankingList[4].distance}`}
        />
      )}
    </Suspense>
  );
}

export default Rank;
