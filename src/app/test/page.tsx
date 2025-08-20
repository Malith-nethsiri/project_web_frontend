'use client'

import { useState } from 'react'

export default function TestPage() {
  const [value, setValue] = useState('')

  return (
    <div style={{ padding: '50px', background: 'white' }}>
      <h1 style={{ color: 'red', fontSize: '30px' }}>TEXT VISIBILITY TEST</h1>
      
      {/* Test 1: Plain HTML input */}
      <div style={{ margin: '20px 0' }}>
        <h2 style={{ color: 'blue' }}>Test 1: Plain HTML Input</h2>
        <input 
          type="text" 
          placeholder="Type here - should see black text"
          style={{
            width: '300px',
            padding: '15px',
            fontSize: '20px',
            color: 'black',
            backgroundColor: 'yellow',
            border: '5px solid red',
            fontFamily: 'Arial',
            fontWeight: 'bold'
          }}
        />
      </div>

      {/* Test 2: Controlled React input */}
      <div style={{ margin: '20px 0' }}>
        <h2 style={{ color: 'blue' }}>Test 2: Controlled React Input</h2>
        <input 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type here - controlled input"
          style={{
            width: '300px',
            padding: '15px',
            fontSize: '20px',
            color: 'purple',
            backgroundColor: 'lime',
            border: '5px solid blue',
            fontFamily: 'Arial',
            fontWeight: 'bold'
          }}
        />
        <p style={{ color: 'green', fontSize: '16px' }}>
          Current value: "{value}"
        </p>
      </div>

      {/* Test 3: Text area */}
      <div style={{ margin: '20px 0' }}>
        <h2 style={{ color: 'blue' }}>Test 3: Textarea</h2>
        <textarea 
          placeholder="Type here - textarea test"
          style={{
            width: '300px',
            height: '100px',
            padding: '15px',
            fontSize: '20px',
            color: 'white',
            backgroundColor: 'darkblue',
            border: '5px solid orange',
            fontFamily: 'Arial',
            fontWeight: 'bold'
          }}
        />
      </div>

      {/* Test 4: Div with contentEditable */}
      <div style={{ margin: '20px 0' }}>
        <h2 style={{ color: 'blue' }}>Test 4: ContentEditable Div</h2>
        <div
          contentEditable
          style={{
            width: '300px',
            height: '50px',
            padding: '15px',
            fontSize: '20px',
            color: 'red',
            backgroundColor: 'yellow',
            border: '5px solid green',
            fontFamily: 'Arial',
            fontWeight: 'bold'
          }}
        >
          Click and type here
        </div>
      </div>
    </div>
  )
}