import Link from "next/link";

async function getData() {
    try {
        const res = await fetch("http://localhost:3000/api/topics");
        const data = await res.json();
        return data.topics;
    } catch (error) {
        console.log(error);
    }
}

const Home = async () => {
    const topics = await getData();
    return (
        <section className="flex_center flex-col gap-5 h-screen">
            {topics.map((topic) => (
                <Link
                    href={topic.topic}
                    key={topic._id}
                    className="bg-gray p-2 text-white hover:bg-blue rounded-md min-w-[6rem] flex_center "
                >
                    {topic.topic}
                </Link>
            ))}
        </section>
    );
};

export default Home;
