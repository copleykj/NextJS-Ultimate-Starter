import Page from 'components/Layouts/Page';
import { getSession, signIn } from 'next-auth/react';
import { NextPageContext } from 'next';
import { FieldError, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import * as zod from 'zod';
import { useState } from 'react';

interface SignInFormInputs {
  email: string;
}

const schema = zod.object({
  email: zod.string().email(),
});

export default function SignIn () {
  const [error, setError] = useState<string | null>(null);
  const [linkSent, setLinkSent] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SignInFormInputs>({
    resolver: zodResolver(schema),
  });

  let allErrors: typeof errors & ({ email?: FieldError | undefined } | undefined) = { ...errors };

  if (error) {
    allErrors = { ...allErrors, email: { type: 'Login Error', message: error } };
  }

  const onSubmit: SubmitHandler<SignInFormInputs> = async ({ email }) => {
    setLoading(true);
    const response = await signIn<'email'>('email', {
      email,
      redirect: false,
    });

    if (response) {
      if (response.error) {
        toast.success(response.error);
        setError(response.error);
      } else {
        setError(null);
        setLinkSent(true);
      }
    }
    setLoading(false);
  };

  const onInvalid: SubmitErrorHandler<SignInFormInputs> = ({ email }) => {
    if (email?.message) {
      toast.error(email?.message);
    }
  };

  const emailError = allErrors.email;

  return (
    <Page>
      <main className="grid place-items-center w-full m-auto min-h-screen prose">
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col w-full sm:w-3/4 md:w-2/3 px-2">
          <div className="flex flex-col grow space-y-8">
            <h1 className="text-center">Starter App Login</h1>
            <div className="form-control">
              <input type="email" placeholder="Email Address" className={`input input-bordered ${emailError ? 'input-error' : ''}`} {...register('email')} />
            </div>
            <div className="form-control">
              <button type="submit" className={`btn btn-accent btn-block ${loading && 'loading'}`}>
                {!loading && <span className="btn-text">Send Login Link</span>}
              </button>
            </div>
          </div>
        </form>
      </main>

      <div id="my-modal" className={`modal ${linkSent && 'modal-open'}`}>
        <div className="modal-box space-y-4">
          <h2 className="text-center tex-primary font-bold text-lg">Success</h2>
          <p className="text-center">
            We have successfully sent you your login link and it should arrive in your email shortly.
          </p>
          <p className='text-center text-lg font-bold'>
            Please check your email.
          </p>
          <div className="modal-action pt-6">
            <button onClick={() => { setLinkSent(false); reset(); }} className="btn btn-accent btn-block">OK</button>
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getServerSideProps (context: NextPageContext) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.user) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }
  return { props: {} };
};
