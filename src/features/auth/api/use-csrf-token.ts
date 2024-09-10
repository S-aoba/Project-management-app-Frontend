export const useCsrfToken = () => {
  const csrfToken = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/sanctum/csrf-cookie`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  const getCsrfToken = () => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; XSRF-TOKEN=`)

    if (parts.length >= 2) {
      return decodeURIComponent(parts[1])
    }
  }

  return { csrfToken, getCsrfToken }
}
