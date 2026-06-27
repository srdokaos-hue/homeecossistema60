"use client"

import Image from "next/image"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type LazyVideoHandle = {
  play: () => void
  pause: () => void
  setMuted: (muted: boolean) => void
  requestFullscreen: () => void
  getVideo: () => HTMLVideoElement | null
}

type LazyVideoProps = {
  /** imagem estática mostrada de cara (não atrasa o load) */
  posterSrc: string
  /** vídeo só baixa/monta ao entrar na viewport e só toca sob demanda */
  videoSrc: string
  className?: string
  videoClassName?: string
  sizes?: string
  loop?: boolean
  /** prioriza o poster no LCP quando a seção está no topo */
  posterPriority?: boolean
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onError?: () => void
}

/**
 * Vídeo "lazy": renderiza só o POSTER de cara. O <video> só é montado quando o
 * container entra na viewport (IntersectionObserver) e fica `preload="none"` —
 * o arquivo de vídeo nunca baixa no load da página, só quando o usuário toca
 * play. Controles ficam com o pai via ref (play/pause/mute/fullscreen).
 */
export const LazyVideo = forwardRef<LazyVideoHandle, LazyVideoProps>(
  function LazyVideo(
    {
      posterSrc,
      videoSrc,
      className,
      videoClassName,
      sizes = "100vw",
      loop = true,
      posterPriority = false,
      onPlay,
      onPause,
      onEnded,
      onError,
    },
    ref,
  ) {
    const containerRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [inView, setInView] = useState(false)

    // monta o <video> só ao entrar na viewport (margem pra pré-aquecer)
    useEffect(() => {
      const el = containerRef.current
      if (!el || inView) return
      if (typeof IntersectionObserver === "undefined") {
        setInView(true)
        return
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setInView(true)
            io.disconnect()
          }
        },
        { rootMargin: "200px" },
      )
      io.observe(el)
      return () => io.disconnect()
    }, [inView])

    useImperativeHandle(ref, () => ({
      play: () => {
        const v = videoRef.current
        if (!v) return
        const p = v.play()
        if (p && typeof p.catch === "function") p.catch(() => onError?.())
      },
      pause: () => videoRef.current?.pause(),
      setMuted: (muted: boolean) => {
        if (videoRef.current) videoRef.current.muted = muted
      },
      requestFullscreen: () => {
        const v = videoRef.current as
          | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
          | null
        if (!v) return
        if (v.requestFullscreen) v.requestFullscreen().catch(() => {})
        else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen()
      },
      getVideo: () => videoRef.current,
    }))

    return (
      <div ref={containerRef} className={className}>
        <Image
          src={posterSrc}
          alt=""
          fill
          sizes={sizes}
          priority={posterPriority}
          className="object-cover"
        />
        {inView && (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted
            playsInline
            loop={loop}
            preload="none"
            onPlay={onPlay}
            onPause={onPause}
            onEnded={onEnded}
            onError={onError}
            className={videoClassName ?? "absolute inset-0 h-full w-full object-cover"}
          />
        )}
      </div>
    )
  },
)
