import type React from "react";

type ModalProps = {
    isOpen:boolean;
    onClose:()=>void;
    children:React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps){
    if(!isOpen){
        return null;
    }

    return(
         <div className="fixed inset-0 flex items-center justify-center !text-shadow-2xs">
            <div className="bg-white rounded-xl p-6 w-96 relative">
                <button
                onClick={onClose}
                className="absolute top-2 right-3 text-gray-500 hover:text-black"
                >
                ✕
                </button>

                {children}
            </div>
        </div>
    )
}

export default Modal;