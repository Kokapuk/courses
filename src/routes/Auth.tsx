import { setAuthenticatedAs } from '@/app/features/auth/authSlice';
import type { RootState } from '@/app/store';
import { userSchema } from '@/types/userSchema';
import { PasswordInput } from '@/ui/password-input';
import { toaster } from '@/ui/toaster';
import { authenticate } from '@/utils/api';
import type { StructuredZodIssues } from '@/utils/structureZodIssues';
import structureZodIssues from '@/utils/structureZodIssues';
import { Button, Card, Field, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import z from 'zod';

export default function Auth() {
  const [formIssues, setFormIssues] = useState<StructuredZodIssues>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const authenticated = useSelector((state: RootState) => !!state.auth.user);

  if (authenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = userSchema.parse(Object.fromEntries(new FormData(event.currentTarget).entries()));

      setLoading(true);

      const user = await authenticate(formData);
      dispatch(setAuthenticatedAs(user));
      navigate('/');
      toaster.create({ title: 'Success', description: 'Successfully logged in', closable: true, type: 'success' });
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        setFormIssues(structureZodIssues(err));
      } else {
        console.error(err);

        if (err instanceof Error) {
          toaster.create({ title: 'Error', description: err.message, closable: true, type: 'error' });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onChange={() => setFormIssues((prev) => (Object.keys(prev).length > 0 ? {} : prev))}
    >
      <Card.Root maxWidth="sm" marginInline="auto">
        <Card.Header>
          <Card.Title as="h2">Log In</Card.Title>
          <Card.Description>Fill in the form below to log in</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root invalid={!!formIssues.email}>
              <Field.Label>Email</Field.Label>
              <Input type="email" name="email" />
              {!!formIssues.email && <Field.ErrorText>{formIssues.email[0]}</Field.ErrorText>}
            </Field.Root>
            <Field.Root invalid={!!formIssues.password}>
              <Field.Label>Password</Field.Label>
              <PasswordInput type="password" name="password" />
              {!!formIssues.password && <Field.ErrorText>{formIssues.password[0]}</Field.ErrorText>}
            </Field.Root>
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button type="submit" loading={isLoading}>
            Log in
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}
