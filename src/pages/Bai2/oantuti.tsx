import { useState } from 'react';
import { Button, Card, Typography, List } from 'antd';

const { Title, Text } = Typography;
const choices = ['Kéo', 'Búa', 'Bao'];

const getResult = (userChoice: string, computerChoice: string) => {
  if (userChoice === computerChoice) return 'Hòa';
  if (
    (userChoice === 'Kéo' && computerChoice === 'Bao') ||
    (userChoice === 'Búa' && computerChoice === 'Kéo') ||
    (userChoice === 'Bao' && computerChoice === 'Búa')
  ) {
    return 'Thắng';
  }
  return 'Thua';
};

interface GameHistory {
  userChoice: string;
  computerChoice: string;
  result: string;
}

export default function OanTuTi() {
  const [history, setHistory] = useState<GameHistory[]>([]);

  const playGame = (userChoice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(userChoice, computerChoice);
    setHistory([...history, { userChoice, computerChoice, result }]);
  };

  return (
    <Card style={{ maxWidth: 500, margin: '20px auto', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
      <Title level={2}>Trò chơi Oẳn Tù Tì</Title>
      <div style={{ marginBottom: 20 }}>
        {choices.map((choice) => (
          <Button key={choice} type="primary" shape="round" style={{ margin: '0 10px' }} onClick={() => playGame(choice)}>
            {choice}
          </Button>
        ))}
      </div>
      <Title level={4}>Lịch sử kết quả:</Title>
      <List
        bordered
        dataSource={history}
        renderItem={(game, index) => (
          <List.Item>
            <Text strong>{index + 1}. Bạn chọn: {game.userChoice}, Máy chọn: {game.computerChoice} → Kết quả: {game.result}</Text>
          </List.Item>
        )}
      />
    </Card>
  );
}