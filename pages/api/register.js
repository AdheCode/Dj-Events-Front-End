import { API_URL_HOST } from "@/config/index";
import cookie from "cookie";
export default async function handler(req, res) {
  if (req.method === 'POST') {
      const {username, password, email} = req.body;

      const request = await fetch(`${API_URL_HOST}/auth/local/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                username, password, email
          })
      });

      const data = await request.json();
      if (request.ok) {
          res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
              httpOnly: true,
              secure:process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 7,
              sameSite: 'strict',
              path: '/'
          }))
          res.status(request.status).json({user: data.user});
      } else {
        res.status(data.statusCode).json({message: data.message[0].messages[0].message});
      }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({message: `Method ${req.method} is not allowed`});
  }
}
