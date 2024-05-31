'use client';
import { Button } from '@/components/ui/button';
import { Provider } from '@supabase/supabase-js';
import { GitBranchPlus } from 'lucide-react';
import { oAuthSignIn } from './actions';

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButton() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <GitBranchPlus className="size-5" />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex items-center justify-center gap-2"
          onClick={async () => {
            await oAuthSignIn(provider.name);
          }}
        >
          {provider.icon}
          Log In With {provider.displayName}
        </Button>
      ))}
    </>
  );
}
