import { useState } from 'preact/hooks'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Box} from '@mui/material'
import {Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed} from './components'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Box sx={{backgroundColor : '#181818'}}>
          <Navbar />

          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path='/video/:id' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail />} />
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  )
}
