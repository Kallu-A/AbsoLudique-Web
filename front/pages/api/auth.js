import {jsonResponse} from "../../lib/utils";
import {setUserCookie} from "../../lib/auth";
import {USER_TOKEN} from "../../lib/constant";

export default async function auth(req) {
  if (req.method !== 'POST') {
    return jsonResponse(405, { error: { message: 'Method not allowed' } })
  }

  try {
    let token = req.searchParams.get(USER_TOKEN)
    return await setUserCookie(jsonResponse(200, { success: true }), token)
  } catch (err) {
    console.error(err)
    return jsonResponse(500, { error: { message: 'Authentication failed.' } })
  }
}