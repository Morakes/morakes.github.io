type Color = [number, number, number, number]

export default class ImageColorExtractor {
  private quality: number
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D | null

  constructor(quality = 10) {
    this.quality = quality
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
  }

  public async loadImageUrl(url: string): Promise<void> {
    if (!this.ctx) {
      throw new Error('Canvas context is not available')
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'

      img.onload = () => {
        try {
          this.processImage(img)
          resolve()
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error('Image loading failed'))
      }

      // 直接加载图片，不设置 crossOrigin
      img.src = url
    })
  }

  private processImage(img: HTMLImageElement): void {
    // 设置较小的尺寸以提高性能
    const scale = Math.min(1, 100 / Math.max(img.width, img.height))
    const width = Math.round(img.width * scale)
    const height = Math.round(img.height * scale)

    this.canvas.width = width
    this.canvas.height = height

    try {
      this.ctx?.drawImage(img, 0, 0, width, height)
      const imageData = this.ctx?.getImageData(0, 0, width, height)
      if (imageData) {
        const dominantColor = this.getDominantColor(imageData)
        console.log(
          'Dominant Color:',
          `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`
        )
      }
    } catch (error) {
      console.error('Error processing image:', error)
      // 如果出错，返回一个默认颜色
      console.log('Dominant Color:', 'rgb(0, 0, 0)')
    }
  }

  private getDominantColor(imageData: ImageData): Color {
    const pixels = imageData.data
    const pixelCount = pixels.length / 4
    const quantizer = new Quantizer(this.quality, pixels)
    const dominantColor = quantizer.getQuantizedColors()[0]
    return dominantColor
  }
}

class Quantizer {
  private k: number
  private pixels: Uint8ClampedArray
  private clusters: Color[]

  constructor(private quality: number, pixels: Uint8ClampedArray) {
    this.k = Math.min(quality, pixels.length / 4)
    this.pixels = pixels
    this.clusters = this.createClusters()
  }

  private createClusters(): Color[] {
    const clusters: Color[] = []
    for (let i = 0; i < this.k; i++) {
      const r = this.pixels[i * 4]
      const g = this.pixels[i * 4 + 1]
      const b = this.pixels[i * 4 + 2]
      clusters.push([r, g, b, 1])
    }
    return clusters
  }

  public getQuantizedColors(): Color[] {
    const assignments = new Array(this.pixels.length / 4).fill(0)
    const centroids = this.clusters.slice()

    for (let i = 0; i < this.pixels.length; i += 4) {
      const r = this.pixels[i]
      const g = this.pixels[i + 1]
      const b = this.pixels[i + 2]
      let minDist = Infinity
      let closestCluster = 0
      for (let j = 0; j < this.k; j++) {
        const cluster = centroids[j]
        const dist = this.distance(r, g, b, cluster[0], cluster[1], cluster[2])
        if (dist < minDist) {
          minDist = dist
          closestCluster = j
        }
      }
      assignments[i / 4] = closestCluster
      centroids[closestCluster] = this.meanColor(centroids[closestCluster], [r, g, b])
    }

    const clusterCounts = new Array(this.k).fill(0)
    assignments.forEach((assignment) => {
      clusterCounts[assignment]++
    })

    const quantizedColors = centroids
      .map((color, index) => {
        return [...color.slice(0, 3), clusterCounts[index]] as Color
      })
      .sort((a, b) => (b[3] || 0) - (a[3] || 0))

    return quantizedColors
  }

  private distance(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
  }

  private meanColor(cluster: Color, color: Color): Color {
    const count = cluster[3] || 1
    const newCount = count + 1
    cluster[0] = Math.round((cluster[0] * count + color[0]) / newCount)
    cluster[1] = Math.round((cluster[1] * count + color[1]) / newCount)
    cluster[2] = Math.round((cluster[2] * count + color[2]) / newCount)
    cluster[3] = newCount
    return cluster
  }
}
