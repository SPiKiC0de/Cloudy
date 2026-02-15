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
            <div className="bg-white/90 backdrop-blur-xl border-4 border-white shadow-xl rounded-3xl p-6 w-290 mt-135 pb-87 mb-120 relative h-140">

                <button
                onClick={onClose}
                className="absolute top-2 right-3 text-black   hover:text-gray-600 font-bold"
                >
                ✕
                </button>
                <div className="">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;