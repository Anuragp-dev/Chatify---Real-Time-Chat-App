import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from '../components/ChatHeader'
import MessageInput from '../components/MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'

const ChatContainer = () => {
    const { messages, getMessages, isMessageLoading, selectedUser } = useChatStore()

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])

    if (isMessageLoading) {
        
        return (

        <div className='flex-1 overflow-y-auto flex flex-col'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )
    }

    return (
        <div className='flex-1 overflow-y-auto flex flex-col'>

            <ChatHeader />

            <p>Messages</p>

            <MessageInput />

        </div>
    )
}

export default ChatContainer
