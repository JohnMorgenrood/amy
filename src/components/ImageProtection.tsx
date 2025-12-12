'use client'

import { useEffect } from 'react'

export function ImageProtection() {
  useEffect(() => {
    // Disable right-click on images
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault()
        return false
      }
    }

    // Disable common keyboard shortcuts for saving/copying
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+S (Save), Ctrl+P (Print), Ctrl+C on images
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 's' || e.key === 'p' || e.key === 'S' || e.key === 'P')
      ) {
        const target = document.activeElement as HTMLElement
        if (target?.tagName === 'IMG' || target?.closest('img')) {
          e.preventDefault()
          return false
        }
      }

      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (Developer Tools)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'u')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Disable drag and drop for images
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG') {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('dragstart', handleDragStart)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return null
}
