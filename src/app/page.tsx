"use client"
import {useModalStore} from "./useModalStore";
import {callApi, ResponseType} from "./api";
import {useState} from "react";
import {useApiStore} from "./apiStore";

export default function Home() {
  const { open } = useModalStore();
  const {id: apiId, title: apiTitle, userId: apiUserId} = useApiStore();
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const openModal = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data:ResponseType = await response.json();
      const isConfirmed = await open({
        title: "컴포넌트 모달",
        content: data.title,
      });
      if (isConfirmed) {
        setId(data.id);
        setTitle(data.title);
        setUserId(data.userId);
      }
    } catch (err) {
      await open({
        title: err.message,
        content: '에에에러러러',
      });
      setId(null);
      setTitle(null);
      setUserId(null);
    }
  }

  return (
    <div>
      <main>
        <h1>모달을 이렇게 저렇게 띄우고 싶어요</h1>
        <button onClick={openModal}>컴포넌트 내에서 띄우기</button>
        <button onClick={callApi}>순수 로직 파일에서 띄우기</button>
        {id && title && userId && (
            <div>
              <h4>컴포넌트 내 모달 호출</h4>
              <p>id: {id}</p>
              <p>title: {title}</p>
              <p>userId: {userId}</p>
            </div>
        )}
        {apiId && apiTitle && apiUserId && (
            <div>
              <h4>api 순수로직 응답 with zustand store</h4>
              <p>apiId: {apiId}</p>
              <p>apiTitle: {apiTitle}</p>
              <p>apiUserId: {apiUserId}</p>
            </div>
        )}
      </main>
    </div>
  );
}