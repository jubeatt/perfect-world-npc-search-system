import { ConfigProvider } from 'antd'
import { Content } from './Content'
import { useEffect, useState } from 'react'
import { FontSize } from './types'
import { DEFAULT_FONT_SIZE } from './static/constant'

const isDevelopment = import.meta.env.DEV

function App() {
  const [fontSize, setFontSize] = useState(() => {
    const storage = localStorage.getItem('fontSize')
    if (storage) {
      return JSON.parse(storage)
    }
    return DEFAULT_FONT_SIZE
  })

  useEffect(() => {
    localStorage.setItem('fontSize', JSON.stringify(fontSize))
  }, [fontSize])

  function handleFontSizeChange(level: FontSize) {
    setFontSize(level)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize,
          colorText: '#444a44',
          colorPrimary: '#ff7518'
        }
      }}
    >
      <Content
        fontSize={fontSize}
        onFontSizeChange={handleFontSizeChange}
      />
      {isDevelopment && <div className='version'>perfect-world-search-system-{APP_VERSION}</div>}
    </ConfigProvider>
  )
}

export default App
