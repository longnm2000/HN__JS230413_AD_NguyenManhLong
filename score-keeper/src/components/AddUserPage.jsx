import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddUserPage() {
  const [inputData, setInputData] = useState({
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });
  const { player1, player2, player3, player4 } = inputData;

  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player1 === "" || player2 === "" || player3 === "" || player4 === "") {
      setIsValid(false);
    } else {
      setIsValid(true);

      axios
        .post("http://localhost:8000/users", inputData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Lỗi khi gửi dữ liệu:", error);
        });
      navigate("/game");
    }
  };
  return (
    <Container>
      <h1>Score Keeper</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter player name"
            value={player1}
            name="player1"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter player name"
            name="player2"
            value={player2}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter player name"
            name="player3"
            value={player3}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter player name"
            name="player4"
            value={player4}
            onChange={handleChange}
          />
        </Form.Group>
        {isValid ? (
          <></>
        ) : (
          <Alert variant={"danger"}>Please input player name</Alert>
        )}
        <Button variant="primary" type="submit">
          Create Game
        </Button>
      </Form>
    </Container>
  );
}

export default AddUserPage;
