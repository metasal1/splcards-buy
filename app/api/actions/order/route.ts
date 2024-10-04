import {
    ActionPostResponse,
    createActionHeaders,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
} from "@solana/actions";

const headers = createActionHeaders({
    chainId: "devnet", // or chainId: "devnet"
    actionVersion: "2.2.1", // the desired spec version
});

export const GET = async () => {
    const payload: ActionGetResponse = {
        title: 'Order SPL Cards v2',
        icon: 'http:/localhost:3000/splcards.png',
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

                    ]
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

    // insert transaction logic here
    // Simulate a transaction
    const transaction = {
        id: Math.random().toString(36).substring(7),
        status: 'completed',
        timestamp: new Date().toISOString()
    };

    // Log the order details
    console.log('Order received:', {
        name: body.fields.name,
        email: body.fields.email,
        quantity: body.fields.quantity,
        message: body.fields.message,
        wallet: body.fields.wallet,
        transaction
    });

    // Here you would typically interact with your database or payment system
    // For now, we'll just return the simulated transaction


    const payload: ActionPostResponse = await createPostResponse({
        fields: {
            transaction,
            message: "I just ordered some SPL cards!",
        },
    });

    return Response.json(payload, {
        headers,
    });
};