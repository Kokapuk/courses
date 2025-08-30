import type { RootState } from '@/app/store';
import { cloneElement, type ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export type AuthRequiredActionProps = { children: ReactElement<{ onClick?: () => void }> };

export default function AuthRequiredAction({ children }: AuthRequiredActionProps) {
  const authenticated = useSelector((state: RootState) => !!state.auth.user);
  const navigate = useNavigate();

  if (authenticated) {
    return children;
  }

  return cloneElement(children, {
    onClick: () => navigate('/auth'),
  });
}
