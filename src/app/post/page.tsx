"use client"

import { useState } from 'react';

const PostToFacebook = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/postToFacebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data);
        setError(null);
      } else {
        setResponse(null);
        setError(data.error);
      }
    } catch (err) {
      setResponse(null);
      setError('Что-то пошло не так');
    }
  };

  return (
    <div>
      <h1>Публикация в Facebook</h1>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
      />
      <button onClick={handleSubmit}>Опубликовать</button>
      {response && <p>Ответ: {JSON.stringify(response)}</p>}
      {error && <p>Ошибка: {error}</p>}
    </div>
  );
};

export default PostToFacebook;