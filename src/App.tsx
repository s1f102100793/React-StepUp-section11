import "./styles.css";
import { Usercard } from "./components/Usercard";
import axios from "axios";
import { User } from "./types/api/user";
import { UserProfile } from "./types/userProfile";
import { useState } from "react";

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);

  const onClickFetchUser = () => {
    setloading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <p>loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <Usercard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
