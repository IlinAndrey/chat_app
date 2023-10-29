import React, { useState } from 'react'

function InputBar({ sendJsonMessage }) {
  const [message, setMessage] = useState("")

  function handleChangeMessage(e) {
    setMessage(e.target.value);
  }

  function handleSubmit() {
    sendJsonMessage({
      // recipient: ,
      message
    });
    setMessage("");
  }


  return (
    <div>
        <input
          name="message"
          placeholder='Message'
          onChange={handleChangeMessage}
          value={message}
          className="ml-2 shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"/>
        <button className='ml-3 bg-gray-300 px-3 py-1' onClick={handleSubmit}>
          Submit
        </button>
    </div>
  )
}

export default InputBar