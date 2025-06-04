export const refreshAccessToken = async (): Promise<{ accessToken: string; user: any } | null> => {
  try {
    const response = await fetch('https://lovestalker.onrender.com/api/auth/refresh', {
      method: 'POST',
      credentials: 'include', 
    });

    if (!response.ok) {
      console.warn('Failed to refresh token');
      return null;
    }

    const data = await response.json();
    const accessToken = data.accessToken;

    const base64Payload = accessToken.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    const user = {
      id: payload.id,
      email: payload.email,
      username: payload.username,
    };

    return { accessToken, user };
  } catch (error) {
    console.error('Uploading token error:', error);
    return null;
  }
};