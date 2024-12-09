import { useState } from 'react'
import '../App.css'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { ContentModal } from '../components/ContentModal'
import { PlusIcon } from '../icons/plus'
import { ShareIcon } from '../icons/share'
import { SideBar } from '../components/Sidebar'

export function Dashboard () {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div>
      <SideBar />
      <div className='p-4 bg-gray-200 ml-72 min-h-screen border-6'>
          <ContentModal open={modalOpen} onClose={() => {setModalOpen(false)}}></ContentModal>
          <div className='flex justify-end gap-4'>
            <Button onClick={() => {setModalOpen(true)}} variants='primary' text='Add Content' startIcon={<PlusIcon></PlusIcon>}></Button>
            <Button variants='secondary' text='Share' startIcon={<ShareIcon></ShareIcon>}></Button>
          </div>
          <div className='flex gap-4'>
            <Card type='twitter' link='https://twitter.com/drk_sunshne/status/1847341078149812634/photo/1' title='First tweet' />

            <Card type='youtube' link='https://www.youtube.com/watch?v=-eDkV9yMBF0' title='First youtube' />
          </div>
      </div>
    </div>
  )
}

