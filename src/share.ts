export const shareHtml = async () => {
  try {
    const htmlContent = document.documentElement.outerHTML
    const blob = new Blob([htmlContent], { type: 'text/html' })
    const files = [new File([blob], 'shabad-os-benchmark.html', { type: 'text/html' })]

    // detect windows agent
    const isWindows = /Windows/.test(navigator.userAgent)

    // Share dialog is awful on windows, so we download the file instead
    if (isWindows) {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'shabad-os-benchmark.html'
      a.click()

      return
    }

    if (navigator.share && navigator.canShare({ files })) {
      await navigator.share({
        title: 'Shabad OS API Benchmark Results',
        files,
      })
    } else {
      alert('Sharing is not supported in your browser')
    }
  } catch (error) {
    console.error('Error sharing:', error)
  }
}
