import {MutableRefObject} from 'react'

export type SearchInputRef = {
  show: (message?: string) => void
  hide: () => void
}

export default class ModalController {
  static modalRef: MutableRefObject<SearchInputRef>
  static setModalRef = (ref: any) => {
    this.modalRef = ref
  }

  static showModal = (message?: string) => {
    this.modalRef.current?.show(message)
  }
  static hideModal = () => {
    this.modalRef.current?.hide()
  }
}
