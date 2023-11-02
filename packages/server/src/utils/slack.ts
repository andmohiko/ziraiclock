export const sendToSlack = async (slackWebhookUrl: string, text: string) => {
  const data = {
    text,
  }
  try {
    await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error(error)
  }
}
