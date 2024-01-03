const getData = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/leaderboard", {
            cache: "no-store",
        });
        const data = await res.json();
        console.log(data);
        return data.res;
    } catch (error) {
        console.log(error);
    }
};

const Leaderboard = async () => {
    const users = await getData();
    console.log(users);
    return (
        <section className="pt-16 px-10 flex_center flex-col">
            <div className="flex justify-between w-[60%] mb-1">
                <p>Name</p>
                <p>Total</p>
            </div>

            {users &&
                users.map((user) => (
                    <div
                        className="flex justify-between w-[60%]"
                        key={user._id}
                    >
                        <p>{user.email}</p>
                        <p>
                            {user.correct_ans}/{user.total_quiz}
                        </p>
                    </div>
                ))}
        </section>
    );
};

export default Leaderboard;
