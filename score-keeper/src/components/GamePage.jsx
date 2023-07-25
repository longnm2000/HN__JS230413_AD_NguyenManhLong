import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function GamePage() {
  const [data, setData] = useState(null);
  const [isDataUpdated, setDataUpdated] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/users");
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    setDataUpdated(!isDataUpdated);
  }, [isDataUpdated]);

  const player1 = data?.users[0].id;
  const player2 = data?.users[1].id;
  const player3 = data?.users[2].id;
  const player4 = data?.users[3].id;

  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [scorePlayer3, setScorePlayer3] = useState(0);
  const [scorePlayer4, setScorePlayer4] = useState(0);

  let inputData = [
    { userId: player1, score: +scorePlayer1 },
    { userId: player2, score: +scorePlayer2 },
    { userId: player3, score: +scorePlayer3 },
    { userId: player4, score: +scorePlayer4 },
  ];

  const handleSave = () => {
    axios
      .post("http://localhost:8000/rounds", inputData)
      .then((response) => {
        console.log(response.data);
        setDataUpdated(!isDataUpdated);
        setScorePlayer1(0);
        setScorePlayer2(0);
        setScorePlayer3(0);
        setScorePlayer4(0);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi dữ liệu:", error);
      });
  };

  const calculateTotalScore = (playerId) => {
    if (!data || !data.rounds || data.rounds.length === 0) return 0;
    let totalScore = 0;
    data.rounds.forEach((round) => {
      const userRound = round.find((item) => item.userId === playerId);
      if (userRound) {
        totalScore += parseInt(userRound.score);
      }
    });

    return totalScore;
  };

  let totalPlayer1 = calculateTotalScore(player1);
  let totalPlayer2 = calculateTotalScore(player2);
  let totalPlayer3 = calculateTotalScore(player3);
  let totalPlayer4 = calculateTotalScore(player4);

  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            {data?.users.map((e, i) => (
              <th key={i}>{e.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-bg-primary">
              Sum of score (
              {totalPlayer1 +
                totalPlayer2 +
                totalPlayer3 +
                totalPlayer4 +
                +scorePlayer1 +
                +scorePlayer2 +
                +scorePlayer3 +
                +scorePlayer4}
              )
            </td>
            {data?.users.map((user, i) => (
              <td className="text-bg-primary" key={i}>
                {calculateTotalScore(user.id) + inputData[i].score}
              </td>
            ))}
          </tr>
          {data?.rounds.map((round, roundIndex) => (
            <tr key={roundIndex}>
              <td>{roundIndex + 1}</td>
              {data.users.map((user) => {
                const userRound = round.find((item) => item.userId === user.id);
                return (
                  <td key={user.id}>{userRound ? userRound.score : "-"}</td>
                );
              })}
            </tr>
          ))}
          <tr>
            <td>Round {data?.rounds.length + 1}</td>
            <td>
              <input
                type="number"
                name="score1"
                id=""
                value={scorePlayer1}
                onChange={(e) => setScorePlayer1(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                name="score2"
                id=""
                value={scorePlayer2}
                onChange={(e) => setScorePlayer2(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                name="score3"
                id=""
                value={scorePlayer3}
                onChange={(e) => setScorePlayer3(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                name="score4"
                id=""
                value={scorePlayer4}
                onChange={(e) => setScorePlayer4(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleSave}>
        Add Round
      </Button>
    </div>
  );
}

export default GamePage;
