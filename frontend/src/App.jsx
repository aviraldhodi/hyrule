import React from 'react'
import OrgSelector from './OrgSelector'

function App() {
  return (
    <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <OrgSelector />
      <div style={{ padding: '2rem', flex: 1 }}>
        <h1>Welcome to Hyrule!</h1>
        <p>Use the top bar to select your Org, map its color, and change your theme.</p>
        <p>The selected theme and org will drive the styling and data for the Query Editor, Data Loader, and Permission Matrices.</p>
      </div>
    </div>
  )
}

export default App
