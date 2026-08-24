declare module "react-simple-maps" {
  import { ComponentType } from "react"

  export interface GeographyProps {
    geography: any
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
  }

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      scale?: number
      center?: [number, number]
      rotation?: [number, number, number]
      parallels?: [number, number]
    }
    style?: React.CSSProperties
    width?: number
    height?: number
    children?: React.ReactNode
  }

  export interface GeographiesProps {
    geography: string
    children: (props: { geographies: any[] }) => React.ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
}
