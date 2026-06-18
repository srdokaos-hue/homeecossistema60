"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Observa o elemento e adiciona estado visível quando entra no viewport.
 * Usado para o fade-up sutil das seções.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
