'use client';

import { createPortal } from 'react-dom';
import {useModalStore} from "./useModalStore";

export const ModalRenderer = () => {
    const { modals, close } = useModalStore();

    if (typeof document === 'undefined') return null;

    return createPortal(
        <>
          {modals.map((modal) => (
              <div key={modal.id} className="overlay">
                <div className="modal-card">
                  {modal.title && <h2>{modal.title}</h2>}

                  <div className="content">
                    {/* 함수면 실행해서 resolve 주입, 아니면 그냥 렌더링 */}
                    {typeof modal.content === 'function'
                        ? modal.content({ resolve: (val) => close(modal.id, val) })
                        : modal.content}
                  </div>

                  {/* 단순 텍스트 모달을 위한 기본 버튼 */}
                  {typeof modal.content === 'string' && (
                      <div className="footer">
                        <button onClick={() => close(modal.id, false)}>닫기</button>
                        <button onClick={() => close(modal.id, true)}>확인</button>
                      </div>
                  )}
                </div>
              </div>
          ))}
        </>,
        document.getElementById('modal-root')!
    );
};