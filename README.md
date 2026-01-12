# 모달 열기

React의 `createPortal`을 활용해 모달을 열어봅니다.



### 컴포넌트 내에서 열기
```
const { open } = useModalStore();
await open({
    title: "상세 정보",
    content: data.title,
});
```
### api 등 순수 로직 상에서 열기
```
useModalStore.getState().open({
    title: '성공',
    content: json.title
})
```

- React, Zustand