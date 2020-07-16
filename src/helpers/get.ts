import axios from 'axios';

export const getBase64Image = async (imgUrl: string) => {
  try {
    const response = await axios.get(imgUrl);

    const base64 = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(response.data).toString('base64');

    return base64;
  } catch (err) {
    return Promise.reject(err);
  }
}