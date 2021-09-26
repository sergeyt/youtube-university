import { atom, useRecoilState, useRecoilValue } from "recoil";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

const loginAtom = atom({
  key: "google.login",
  default: {
    auth: undefined as GoogleLoginResponse | undefined,
  },
});

export function useAccessToken() {
  const state = useRecoilValue(loginAtom);
  return state.auth?.accessToken;
}

export default function GoogleAuth() {
  const [state, setState] = useRecoilState(loginAtom);
  return (
    <>
      {!state.auth ? (
        <GoogleLogin
          clientId="880550922068-iqoneg60eemq4akku27rs0bi4jao7qgb.apps.googleusercontent.com"
          scope="https://www.googleapis.com/auth/youtube.readonly"
          onSuccess={(resp) => {
            console.log("google login response:", resp);
            if ((resp as any).accessToken) {
              setState({ auth: resp as GoogleLoginResponse });
            }
          }}
        />
      ) : null}
    </>
  );
}
