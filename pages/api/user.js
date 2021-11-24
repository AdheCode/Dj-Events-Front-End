import { API_URL_HOST } from "@/config/index";
import cookie from "cookie";
export default async function handler(req, res) {
  if (req.method === 'GET') {
      if (!req.headers.cookie){
        res.status(403).json({message: 'Not Authorized'});
      }

      const {token} = cookie.parse(req.headers.cookie);

      const request = await fetch(`${API_URL_HOST}/users/me`, {
          method: 'GET',
          headers: {
              Authorization: 'Bearer ' + token
          },
      });

      const data = await request.json();
      if (request.ok) {
          res.status(request.status).json({data});
      } else {
        res.status(request.status).json({message: 'User forbidden'});
      }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({message: `Method ${req.method} is not allowed`});
  }
}
