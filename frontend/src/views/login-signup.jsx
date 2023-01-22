import { useState } from "react"
import { Login } from "./login"
import { Signup } from "./signup"

export function LoginSignup() {
  const [isSignup, setIsSignup] = useState(false)

  return (
    <div className="login-signup">
      {isSignup ? (
        <Login setIsSignup={setIsSignup} />
      ) : (
        <Signup setIsSignup={setIsSignup} />
      )}
    </div>
  )
}
