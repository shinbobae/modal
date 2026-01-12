import {useModalStore} from "./useModalStore";
import {useApiStore} from "./apiStore";


export interface ResponseType {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}
export const callApi = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const json: ResponseType = await response.json();
    const isConfirmed = await useModalStore.getState().open({
      title: '순수 로직 모달',
      content: json.title
    })
    if (isConfirmed) {
      useApiStore.getState().setId(json.id);
      useApiStore.getState().setTitle(json.title);
      useApiStore.getState().setUserId(json.userId);
    }

  } catch (err) {
    await useModalStore.getState().open({
      title: err.message,
      content: err.message
    });
    useApiStore.getState().setId(null);
    useApiStore.getState().setTitle(null);
    useApiStore.getState().setUserId(null);
  }
};