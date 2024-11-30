import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/plus'

function App() {
  return (
    <>
      <Button
      startIcon={<PlusIcon size='lg'/>} 
      title='Share' 
      size='lg'></Button>
    </>
  )
}

export default App
