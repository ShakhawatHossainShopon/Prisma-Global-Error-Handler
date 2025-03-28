import React from "react";
import Link from "next/link";
import RemoveBtn from "@/app/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("error occured");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const TopicList = async () => {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((value, index) => {
        return (
          <div
            key={value._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{value.title}</h2>
              <div>{value.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={value._id} />
              <Link href={`/editTopic/${value._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicList;
