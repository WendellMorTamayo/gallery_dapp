import {Dialog, Transition} from '@headlessui/react'
import React, {Fragment, useState} from 'react'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddGifModal({addGif, addGifModalOpen, setAddGifModalOpen, transactionPending, loading}) {
    const [imageURL, setImageURL] = useState('')

    const closeModal = () => {
        setAddGifModalOpen(false)
    }

    const onCreate = (e) => {
        e.preventDefault();
        addGif(imageURL)
            .then(() => {
                toast.success('Successfully added a gif!');
                closeModal();
            })
            .catch((error) => {
                console.error('Error adding a gif:', error);
                toast.error('Failed to add a gif. Please try again.');
            });
    };


    return (
        <Transition appear show={addGifModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>

                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0"
                                  enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100"
                                  leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95"
                                          enterTo="opacity-100 scale-100" leave="ease-in duration-200"
                                          leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                    Add Gif


                                </Dialog.Title>

                                <div className="mt-2">
                                    <div className="grid grid-cols-1 gap-3">
                                        <label className="flex flex-col border rounded-lg px-3 py-2" htmlFor="imageURL">
                                            <span className="text-xs font-light">Enter GIF URL here</span>
                                            <input onChange={(e) => setImageURL(e.target.value)}
                                                   className="outline-none bg-transparent text-sm pt-1" type="text"
                                                   id="imageURL" name="imageURL"/>
                                        </label>
                                    </div>

                                    <div className="mt-4 flex justify-end">
                                        <button onClick={onCreate} type="button"
                                                className="border rounded-lg px-4 py-2 text-sm font-medium">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>

        </Transition>
    )
}