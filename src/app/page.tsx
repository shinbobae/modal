"use client"
import {useModalStore} from "./useModalStore";
import {callApi, ResponseType} from "./api";
import {useState} from "react";
import {useApiStore} from "./apiStore";

interface ModalData {
  id: number | null;
  title: string | null;
  userId: number | null;
}
export default function Home() {
  const { open } = useModalStore();
  const {id: apiId, title: apiTitle, userId: apiUserId} = useApiStore();
  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [modalData, setModalData] = useState<ModalData>(null);

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
  const openContentModal = async () => {
    const receivedModal: ModalData | null = await open({
      title: '콘텐츠에 컴포넌트를 주입한 모달',
      content: ({ resolve }) => <ModalContent resolve={resolve} />
    });
    if (receivedModal) {
      setModalData(receivedModal)
    }
  }

  return (
    <div>
      <main>
        <h1>모달을 이렇게 저렇게 띄우고 싶어요</h1>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div>
            <h4>페이지 내 모달 호출</h4>
            <button onClick={openModal}>페이지 내에서 띄우기</button>
            <p>id: {id}</p>
            <p>title: {title}</p>
            <p>userId: {userId}</p>
          </div>
          <div>
            <h4>UI 모달 컴포넌트 주입</h4>
            <button onClick={openContentModal}>페이지 내에서 컴포넌트로 주입한 컨텐츠 띄우기</button>
            <p>contentId: {modalData?.id}</p>
            <p>contentTitle: {modalData?.title}</p>
            <p>contentUserId: {modalData?.userId}</p>
          </div>
          <div>
            <h4>api 순수로직 응답 with zustand store</h4>
            <button onClick={callApi}>순수 로직 파일에서 띄우기</button>
            <p>apiId: {apiId}</p>
            <p>apiTitle: {apiTitle}</p>
            <p>apiUserId: {apiUserId}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

const ModalContent = ({ resolve }: { resolve: (val: ModalData) => void }) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const sendData = () => {
    const data = {id, title, userId};
    resolve(data);
  };
  const parseValueToNumber = (value: string | number) => {
    if (value === '' || isNaN(Number(value))) return 0;
    return Number(value)
  }

  return (
    <div>
      <div>id: <input type="text" value={id} onChange={(e) => setId(parseValueToNumber(e.target.value))} /></div>
      <div>title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
      <div>userId: <input type="text" value={userId} onChange={(e) => setUserId(parseValueToNumber(e.target.value))} /></div>
      <button onClick={() => resolve(null)}>닫기</button>
      <button onClick={sendData}>데이터 전송</button>
    </div>
  )
}