import { forwardRef, ReactNode, useEffect, useImperativeHandle, useRef } from "react";
import Loading from "../atoms/Loading";

export interface ConfirmModalMethod {
    show: () => void
    close: () => void
}

export interface ConfirmModalProps {
    open?: boolean
    children: ReactNode
    handleOk: () => void;
    handleCancel?: () => void;
}

const ConfirmModal = forwardRef<ConfirmModalMethod, ConfirmModalProps>((props, ref) => {

    const dialogRef = useRef<HTMLDialogElement>(null);

    const showModal = () => {
        if (dialogRef.current === null) {
            throw new Error("target ref is null. cannot open modal")
        }
        dialogRef.current.showModal()
    }

    const closeModal = () => {
        if (dialogRef.current === null) {
            throw new Error("target ref is null. cannot open modal")
        }
        dialogRef.current.close()
    }

    useEffect(() => {
        if (props.open != undefined) {
            if (props.open) {
                showModal()
            } else {
                closeModal()
            }
        }
    }, [dialogRef])


    useImperativeHandle(ref, () => ({
        show() {
            showModal()
        },
        close() {
            closeModal()
        }
    }))

    const clickCancel = () => {
        if (props.handleCancel !== undefined) {
            props.handleCancel()
            return
        }
        closeModal()
    }

    return (
        <dialog id="loading_modal" className="modal" ref={dialogRef}>
            { /*bg-whiteがないと背景と一緒に透過してしまう 
                ダークモードを入れる場合は、ここが白いままになってしまう
            */}
            <div className="modal-box w-96 bg-white shadow-xl">
                <div className="card-title">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h2 className="font-bold text-lg">確認</h2>
                </div>
                {props.children}
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={() => props.handleOk()} >OK</button>
                    <button className="btn" onClick={() => clickCancel()}>キャンセル</button>
                </div>
            </div>
        </dialog>
    )
})

export default ConfirmModal