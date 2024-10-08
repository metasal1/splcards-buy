'use client';

import { Blink, useAction, useActionsRegistryInterval } from '@dialectlabs/blinks';
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana';
import '@dialectlabs/blinks/index.css';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
    useActionsRegistryInterval();

    const { adapter } = useActionSolanaWalletAdapter(
        'https://mainnet.helius-rpc.com/?api-key=ff0d3523-6397-47bf-bf5d-acb7d765d5ff',
    );
    const { action, isLoading } = useAction({
        url: 'solana-action:https://blink.splcards.com/api/actions/order',
        adapter,
    });

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex min-w-[400px] flex-col items-center">
                <h1 className="mb-4 text-center text-4xl font-bold">Blinks</h1>
                <div className="mb-4 w-full">
                    {isLoading || !action ? (
                        <span>Loading</span>
                    ) : (
                        <Blink stylePreset='x-dark'
                            action={action}
                        />
                    )}
                </div>
                <WalletMultiButton />
            </div>
        </div>
    );
}
