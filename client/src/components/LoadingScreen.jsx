import React from 'react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="text-white text-xl">Processing audio, please wait...</div>
    </div>
  )
}
