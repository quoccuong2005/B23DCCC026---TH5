import React, { useState } from "react";
import { Input, Button, Card, Typography, message as antMessage } from "antd";
const { Title, Text } = Typography;
const Doanso = () => {
    //khai báo các state trạng thái
    const [randomNumber, setRandomNumber] = useState(
        Math.floor(Math.random() * 100) + 1
    );
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [attempts, setAttempts] = useState(10);
    const [gameOver, setGameOver] = useState(false);

    // Xử lý khi người chơi nhập số đoán
    const handleGuess = () => {
        if (gameOver) return; // Kiểm tra xem trò chơi đã kết thúc chưa

        const guessedNumber = parseInt(guess); // chuyển số nhập sang dạng số nguyên
        if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) { //Kiểm tra số nhập vào có đúng yêu cầu không
            setMessage("⚠️ Vui lòng nhập một số hợp lệ từ 1 đến 100.");
            antMessage.warning("Vui lòng nhập số hợp lệ từ 1 đến 100!");
            return;
        }

        setAttempts(attempts - 1);

        if (guessedNumber === randomNumber) {// Kiểm tra xem số nhập có đúng không rồi thông báo
            antMessage.success("Chúc mừng! Bạn đã đoán đúng!");
            setGameOver(true);
        } else if (guessedNumber < randomNumber) {// Nếu số nhập nhỏ hơn số random thì thông báo
            antMessage.warning("Bạn đoán quá thấp!")
        } else {
            // Nếu số nhập lớn hơn
            antMessage.warning("Bạn đoán quá cao!")
        }

        if (attempts - 1 === 0 && guessedNumber !== randomNumber) {// Nếu số lượt = 0 , số nhập khác với số random thì thông báo hết lượt và hiển thị ra số random đúng
            antMessage.error(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
            setGameOver(true);
        }
    };

    const resetGame = () => { // Reset lại trò chơi
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setGuess("");
        setMessage("");
        setAttempts(10);
        setGameOver(false);
    };
    return (
        <>
            <Card title={<Title level={2}>🎯 Đoán số bí ẩn</Title>} bordered>
                <Text strong style={{fontSize: 20}}>Hãy đoán một số từ 1 đến 100!</Text>
                <p style={{fontSize: 20}}>Lượt còn lại: <Text type="warning">{attempts}</Text></p>

                <Input // input nhập số đoán 
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    disabled={gameOver}

                    placeholder="Nhập số..."
                />

                <Button // Nút đoán khi nhập số
                    onClick={handleGuess}
                    disabled={gameOver}
type="primary"
                    block
                    style={{ marginTop: 30 }}

                >
                    Đoán
                </Button>

                {message && <Text className="game-message">{message}</Text>}

                {gameOver && ( // Nút reset lại trò chơi
                    <Button
                        onClick={resetGame}
                        type="dashed"
                        danger
                        block
                    >
                        Chơi lại 🔄
                    </Button>
                )}
            </Card>
        </>
    )

}
export default Doanso