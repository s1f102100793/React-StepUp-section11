import "./styles.css";
import { Usercard } from "./components/Usercard";
import { useALLUsers } from "./hooks/useALLUsers";

export default function App() {
  const { getUsers, userProfiles, loading, error } = useALLUsers();
  const onClickFetchUser = () => getUsers();
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
