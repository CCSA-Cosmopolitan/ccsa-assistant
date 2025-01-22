"use client"

import type React from "react"
import { useState, useEffect } from "react"

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const newElements = [...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-green-600 dark:opacity-30 bg-opacity-30"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`,
        }}
      ></div>
    ))
    setElements(newElements)
  }, [])

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{elements}</div>
}

export default FloatingElements




// import type React from "react"

// const FloatingElements: React.FC = () => {
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute rounded-full bg-green-500 bg-opacity-10"
//           style={{
//             width: `${Math.random() * 100 + 50}px`,
//             height: `${Math.random() * 100 + 50}px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
//             animationDelay: `${Math.random() * 5}s`,
//           }}
//         ></div>
//       ))}
//     </div>
//   )
// }

// export default FloatingElements

