import {
    ActionPostResponse,
    createActionHeaders,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    MEMO_PROGRAM_ID,
} from "@solana/actions";
import { clusterApiUrl, ComputeBudgetProgram, Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

const headers = createActionHeaders({
    chainId: "devnet", // or chainId: "devnet"
    actionVersion: "2.2.1", // the desired spec version
});

export const GET = async () => {
    const payload: ActionGetResponse = {
        title: 'Order SPL Cards v2',
        icon: 'https://blink.splcards.com/splcards.png',
        label: 'Order SPL Cards',
        description: 'Great for those well-versed in crypto, and for those that are new here.',
        links: {
            actions: [
                {
                    label: "Order", // button text
                    href: "/api/order?name={name}&email={email}&quantity={quantity}&message={message}&wallet={wallet}",
                    parameters: [
                        {
                            type: "text",
                            name: "name",
                            label: "Name",
                            required: true,
                        },
                        {
                            type: "email",
                            name: "email",
                            label: "Email",
                            required: true,
                        },
                        {
                            type: "number",
                            name: "quantity",
                            label: "How many would you like to order?",
                            required: true,
                        },
                        {
                            type: "textarea",
                            name: "message",
                            label: "Message",
                            required: false,
                        },
                        {
                            type: "text",
                            name: "wallet",
                            label: "Wallet address (optional for NFT drop)",
                            required: false,
                        },
                    ],
                    type: "message"
                }
            ]
        }
    };

    return Response.json(payload, {
        headers,
    });
}

export const OPTIONS = GET;

export const POST = async (req: Request) => {
    const body: ActionPostRequest = await req.json();
    let account: PublicKey;

    const connection = new Connection(
        process.env.SOLANA_RPCM! || clusterApiUrl('mainnet-beta'),
    );
    try {
        account = new PublicKey(body.account);
    } catch (error) {
        return new Response(`Invalid "account" provided: ${error}`, {
            status: 400,
            headers,
        });
    }

    const transaction = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 1000,
        }),
        new TransactionInstruction({
            programId: new PublicKey(MEMO_PROGRAM_ID),
            data: Buffer.from('I just ordered some SPL cards!', 'utf8'),
            keys: [],
        }),
    );

    transaction.feePayer = account;

    transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
    ).blockhash;
    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: "Congratulations! Your SPL cards have been ordered.",
            type: "transaction",
        }
    });

    return Response.json(payload, {
        headers,
    });
};