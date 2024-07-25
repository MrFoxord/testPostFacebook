import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await axios.post(`https://graph.facebook.com/${process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID}/feed`, {
      message: message,
      access_token: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ACCESS_TOKEN,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    // Проверяем, что error имеет поле response
    if (axios.isAxiosError(error)) {
      // Указываем тип ошибки как AxiosError
      const errorMessage = error.response?.data?.error?.message || 'Неизвестная ошибка';
      const status = error.response?.status || 500;

      return NextResponse.json({ error: errorMessage }, { status });
    } else {
      // Обрабатываем случай, когда error не является AxiosError
      const errorMessage = 'Неизвестная ошибка';
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }
}