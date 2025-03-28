import TopicList from "@/app/components/TopicList";
import dbConnect from "@/libs/dbConnect";
export default function Home() {
  return (
    <div>
      <TopicList />
    </div>
  );
}
