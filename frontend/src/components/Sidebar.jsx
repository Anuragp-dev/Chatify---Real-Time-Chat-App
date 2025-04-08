import React from 'react'
import { useChatStore } from '../store/useChatStore'

const Sidebar = () => {
    const {getUser, users, selectedUser,setSelectedUser} = useChatStore()
  return (
    <div>
      sidebar
    </div>
  )
}

export default Sidebar
