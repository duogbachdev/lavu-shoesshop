import { Button, message } from 'antd'
import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase/firebaseConfig';
import handleAPI from '../../../apis/handleAPI';
import { addAuth } from '../../../redux/reducers/authReducers';
import { localDateNames } from '../../../constants/appInfor';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  'login_hint': 'contact.duogbachdev@gmail.com'
});

interface Props {
  isRemember?: boolean
}


const SocialLogin = (props: Props) => {
  const { isRemember } = props
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleLoginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const user = result.user

        if (user) {
          const data = {
            name: user.displayName,
            email: user.email,
          }

          const api = '/auth/google-login'

          try {
            const res: any = await handleAPI(api, data, 'post')

            dispatch(addAuth(res.data))
            if (isRemember) {
              localStorage.setItem(localDateNames.authData, JSON.stringify(res.data))
            }
            message.success(res.message)
          } catch (error: any) {
            console.log(error.message);
          } finally {
            setIsLoading(false)
          }
        }
      } else {
        console.log('Can not sign in with Google');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  return <Button loading={isLoading} style={{ width: '100%' }} size='large' icon={<img width="24" height="24" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo" />} onClick={handleLoginWithGoogle}>Sign in with Google</Button>
}

export default SocialLogin